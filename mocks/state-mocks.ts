import * as core from "@core";
import * as modules from "@modules";
import { day, generateID } from "@utils";
import PouchDB from "pouchdb-browser";

// Initialize Settings Store
const settingsDb = new PouchDB("settings");
const settingsStore = new modules.Settings({
	model: modules.SettingsItem,
	DBInstance: settingsDb as any,
});
modules.setSettingsStore(settingsStore);

// Initialize Staff Store
const staffDb = new PouchDB("doctors");
const staffStore = new modules.Staff({
	model: modules.StaffMember,
	DBInstance: staffDb as any,
});
modules.setStaffStore(staffStore);

// Initialize Treatments Store
const treatmentsDb = new PouchDB("treatments");
const treatmentsStore = new modules.Treatments({
	model: modules.Treatment,
	DBInstance: treatmentsDb as any,
});
modules.setTreatmentsStore(treatmentsStore);

// Initialize Patients Store
const patientsDb = new PouchDB("patients");
const patientsStore = new modules.Patients({
	model: modules.Patient,
	DBInstance: patientsDb as any,
});
modules.setPatientsStore(patientsStore);

// Initialize Appointments Store
const appointmentsDb = new PouchDB("appointments");
const appointmentsStore = new modules.Appointments({
	model: modules.Appointment,
	DBInstance: appointmentsDb as any,
});
modules.setAppointmentsStore(appointmentsStore);

// Initialize Orthodontic Store
const orthoDb = new PouchDB("orthodontic");
const orthoStore = new modules.OrthoCases({
	model: modules.OrthoCase,
	DBInstance: orthoDb as any,
});
modules.setOrthoCasesStore(orthoStore);

// Initialize Labwork Store
const labworkDb = new PouchDB("labwork");
const labworkStore = new modules.Labworks({
	model: modules.Labwork,
	DBInstance: labworkDb as any,
});
modules.setLabworksStore(labworkStore);

// Initialize Prescriptions Store
const prescriptionsDb = new PouchDB("prescriptions");
const prescriptionsStore = new modules.Prescriptions({
	model: modules.PrescriptionItem,
	DBInstance: prescriptionsDb as any,
});
modules.setPrescriptionsStore(prescriptionsStore);

// Add default settings
settingsStore.setSetting("hourlyRate", "50");
settingsStore.setSetting("currencySymbol", "$");
settingsStore.setSetting("lang", "en");

// Add staff members
const staffMemberA = staffStore.new({
	_id: generateID(),
	name: "A",
	operates: true,
	onDutyDays: ["Wednesday"],
	pin: "0000",
} as any);

const staffMemberB = staffStore.new({
	_id: generateID(),
	name: "B",
	operates: true,
	onDutyDays: ["Thursday"],
	pin: "0000",
} as any);

staffStore.add(staffMemberA);
staffStore.add(staffMemberB);

// Add treatments
const treatmentA = treatmentsStore.new({
	_id: generateID(),
	type: "A",
	expenses: 10,
} as any);

const treatmentB = treatmentsStore.new({
	_id: generateID(),
	type: "B",
	expenses: 20,
} as any);

treatmentsStore.add(treatmentA);
treatmentsStore.add(treatmentB);

// Add patients
const patientA = patientsStore.new({
	_id: generateID(),
	name: "A",
	teeth: [],
	labels: [],
} as any);

const patientB = patientsStore.new({
	_id: generateID(),
	name: "B",
	teeth: [],
	labels: [],
} as any);

patientsStore.add(patientA);
patientsStore.add(patientB);

// Add appointments
const appointmentA = appointmentsStore.new();
appointmentA._id = generateID();
appointmentA.date = new Date().getTime();
appointmentA.staffID = [staffMemberA._id];
appointmentA.notes = "A";

const appointmentB = appointmentsStore.new();
appointmentB._id = generateID();
appointmentB.date = new Date().getTime();
appointmentB.staffID = [staffMemberB._id];
appointmentB.notes = "B";

const appointmentC = appointmentsStore.new();
appointmentC._id = generateID();
appointmentC.date = new Date().getTime() - day * 30;
appointmentC.staffID = [staffMemberA._id];
appointmentC.notes = "C";

const appointmentD = appointmentsStore.new();
appointmentD._id = generateID();
appointmentD.date = new Date().getTime() - day * 30;
appointmentD.staffID = [staffMemberB._id];
appointmentD.notes = "D";

appointmentsStore.add(appointmentA);
appointmentsStore.add(appointmentB);
appointmentsStore.add(appointmentC);
appointmentsStore.add(appointmentD);
