import { documentTransformation } from "./transform";
import { status } from "@core";
import { store, username } from "@utils";
import * as utils from "@utils";
import { Md5 } from "ts-md5";
import PouchDB from "pouchdb-browser";
import transformPouch from "transform-pouch";
import auth from "pouchdb-authentication";

// Register plugins once
PouchDB.plugin(auth);
PouchDB.plugin(transformPouch);

type methodsArr = Array<() => Promise<void>>;

export const DBNames: string[] = [];
export const defaultsArr: any[] = [];
export const remoteDBRefs: PouchDB.Database<any>[] = [];
export const localDBRefs: PouchDB.Database<any>[] = [];

export const methods: {
	resync: methodsArr;
	compact: methodsArr;
	destroy: methodsArr;
	logout: methodsArr;
} = {
	resync: [],
	compact: [],
	destroy: [],
	logout: [],
};

export async function dbAction(
	action: keyof typeof methods,
	dbName?: string,
	initial?: boolean
) {
	const progressID = Math.random().toString();
	status.dbActionProgress.push(progressID);
	try {
		if (dbName) {
			// apply on specific DB
			const dbIndex = DBNames.indexOf(dbName);
			const singleAction = methods[action][dbIndex];
			if (singleAction) {
				await singleAction();
			}
		} else {
			await Promise.all(
				methods[action].map(async (func, index) => {
					try {
						await func();
					} catch (e) {
						utils.log(
							"PERFORMING MULTIPLE DBs ACTION",
							action,
							DBNames[index],
							e
						);
					}
					if (initial) {
						status.finishedTasks++;
					}
					return;
				})
			);
		}
	} catch (e) {
		utils.log("PERFORMING SINGLE DB ACTION", action, dbName, e);
	}
	status.dbActionProgress.splice(
		status.dbActionProgress.indexOf(progressID),
		1
	);
}

export async function importPouchDB() {
	return PouchDB;
}

export function preUniqueString() {
	try {
		const LSL_time = store.get("LSL_time");
		const payload = JSON.parse(atob(LSL_time.split(".")[1]));
		const secret = payload.data.user.secret;
		return secret;
	} catch {
		return "";
	}
}

export function uniqueString() {
	const unique = Md5.hashStr(store.get("LSL_hash")).toString();
	return unique;
}

export async function genLocalInstance<S extends {} = any>(
	dbName: string
): Promise<PouchDB.Database<S>> {
	const PouchDB = await importPouchDB();
	const localName = dbName + "_" + Md5.hashStr(status.server + username());
	return localTransformation(
		new PouchDB<S>(localName, { auto_compaction: true, revs_limit: 2 }),
		dbName
	);
}

export async function genRemoteInstance<S extends {} = any>(dbName: string) {
	const PouchDB = await importPouchDB();
	const remoteName = dbName;
	return remoteTransformations(
		new PouchDB<S>(`${status.server}/${remoteName}`, {
			revs_limit: 2,
			auto_compaction: true,
			fetch: (url: string | Request, opts?: any) => {
				return PouchDB.fetch(url, {
					...opts,
					credentials: "include",
					headers: {
						Authorization: `Bearer ${store.get("LSL_time")}`,
						"Content-Type": "application/json",
					},
				});
			},
		}),
		dbName
	);
}

const transVars: { unique: string; usableDefaults: any } = {
	unique: "",
	usableDefaults: {},
};

export function remoteTransformations<S extends {}>(
	db: PouchDB.Database<S>,
	name: string
): PouchDB.Database<S> {
	documentTransformation(
		db,
		transVars.unique,
		transVars.usableDefaults[name] || {},
		true
	);
	return db;
}

export function localTransformation<S extends {}>(
	db: PouchDB.Database<S>,
	name: string
): PouchDB.Database<S> {
	documentTransformation(
		db,
		transVars.unique,
		transVars.usableDefaults[name] || {}
	);
	return db;
}

export async function connect<S extends {}>(dbName: string, defaults: any) {
	const usableDefaults = new defaults(null).toJSON();
	const unique = uniqueString();
	transVars.unique = unique;
	transVars.usableDefaults[dbName] = usableDefaults;

	const localDatabase = await genLocalInstance<S>(dbName);
	const remoteDatabase = await genRemoteInstance<S>(dbName);

	// preventing duplicates
	const oldIndex = DBNames.indexOf(dbName);
	if (oldIndex !== -1) {
		DBNames.splice(oldIndex, 1);
		methods.resync.splice(oldIndex, 1);
		methods.destroy.splice(oldIndex, 1);
		methods.compact.splice(oldIndex, 1);
		methods.logout.splice(oldIndex, 1);
	}

	DBNames.push(dbName);
	const refI = DBNames.indexOf(dbName);
	defaultsArr[refI] = usableDefaults;
	localDBRefs[refI] = localDatabase;
	remoteDBRefs[refI] = remoteDatabase;
	methods.resync[refI] = async () => {
		if (remoteDatabase) {
			await localDatabase.sync(remoteDatabase, {
				batch_size: 50,
			});
		}
	};
	methods.destroy[refI] = async () => {
		await localDatabase.destroy();
	};
	methods.logout[refI] = async () => {
		if (remoteDatabase) {
			await remoteDatabase.logOut();
		}
	};
	methods.compact[refI] = async () => {
		await localDatabase.compact();
		if (remoteDatabase) {
			await remoteDatabase.compact();
		}
	};
	await removeConflicts(localDatabase);
	return { localDatabase, remoteDatabase };
}

export async function removeConflicts(db: PouchDB.Database<any>) {
	const res = await db.allDocs({
		conflicts: true,
		include_docs: true,
	});

	for (let index = 0; index < res.rows.length; index++) {
		const entry = res.rows[index];
		if (
			entry.doc &&
			entry.doc!._conflicts &&
			entry.doc!._conflicts.length
		) {
			const currentRevision = entry.value.rev;
			const conflicts = entry.doc!._conflicts;
			for (let cIndex = 0; cIndex < conflicts.length; cIndex++) {
				const conflict = conflicts[cIndex];
				if (conflict !== currentRevision) {
					await db.remove({
						_id: entry.doc!._id,
						_rev: conflict,
					});
				}
			}
		}
	}
}

export { documentTransformation };
export { DTF } from "./transform";
