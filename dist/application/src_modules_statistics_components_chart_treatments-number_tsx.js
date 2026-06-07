"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkrkds_app"] = self["webpackChunkrkds_app"] || []).push([["src_modules_statistics_components_chart_treatments-number_tsx"],{

/***/ "./src/modules/statistics/components/chart.treatments-number.tsx"
/*!***********************************************************************!*\
  !*** ./src/modules/statistics/components/chart.treatments-number.tsx ***!
  \***********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TreatmentsNumberChart: () => (/* binding */ TreatmentsNumberChart)\n/* harmony export */ });\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.mjs\");\n/* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @common-components */ \"./src/common-components/index.ts\");\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core */ \"./src/core/index.ts\");\n/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mobx */ \"./node_modules/mobx/lib/mobx.module.js\");\n/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mobx-react */ \"./node_modules/mobx-react/dist/mobxreact.esm.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\nlet TreatmentsNumberChart = class TreatmentsNumberChart extends react__WEBPACK_IMPORTED_MODULE_5__.Component {\n    get values() {\n        return this.props.selectedTreatments.map((treatment, i) => ({\n            x: i,\n            y: Math.round(treatment.profit),\n            times: treatment.times,\n            title: treatment.treatment.type,\n        }));\n    }\n    render() {\n        return (react__WEBPACK_IMPORTED_MODULE_5__.createElement(\"div\", null,\n            react__WEBPACK_IMPORTED_MODULE_5__.createElement(_common_components__WEBPACK_IMPORTED_MODULE_1__.BarChartComponent, { ...{\n                    height: 400,\n                    notStacked: true,\n                    data: {\n                        xLabels: this.values.map((x) => x.title),\n                        bars: [\n                            {\n                                label: (0,_core__WEBPACK_IMPORTED_MODULE_2__.text)(\"profits\").c,\n                                data: this.values.map((x) => x.y),\n                            },\n                            {\n                                label: (0,_core__WEBPACK_IMPORTED_MODULE_2__.text)(\"applied times\").c,\n                                data: this.values.map((x) => x.times),\n                            },\n                        ],\n                    },\n                } })));\n    }\n};\n(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([\n    mobx__WEBPACK_IMPORTED_MODULE_3__.computed\n], TreatmentsNumberChart.prototype, \"values\", null);\nTreatmentsNumberChart = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([\n    mobx_react__WEBPACK_IMPORTED_MODULE_4__.observer\n], TreatmentsNumberChart);\n\n\n\n//# sourceURL=webpack://rkds.app/./src/modules/statistics/components/chart.treatments-number.tsx?\n}");

/***/ }

}]);