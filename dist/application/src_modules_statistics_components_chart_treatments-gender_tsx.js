"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkrkds_app"] = self["webpackChunkrkds_app"] || []).push([["src_modules_statistics_components_chart_treatments-gender_tsx"],{

/***/ "./src/modules/statistics/components/chart.treatments-gender.tsx"
/*!***********************************************************************!*\
  !*** ./src/modules/statistics/components/chart.treatments-gender.tsx ***!
  \***********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TreatmentsByGenderChart: () => (/* binding */ TreatmentsByGenderChart)\n/* harmony export */ });\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.mjs\");\n/* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @common-components */ \"./src/common-components/index.ts\");\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core */ \"./src/core/index.ts\");\n/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mobx-react */ \"./node_modules/mobx-react/dist/mobxreact.esm.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nlet TreatmentsByGenderChart = class TreatmentsByGenderChart extends react__WEBPACK_IMPORTED_MODULE_4__.Component {\n    render() {\n        return (react__WEBPACK_IMPORTED_MODULE_4__.createElement(\"div\", null,\n            react__WEBPACK_IMPORTED_MODULE_4__.createElement(_common_components__WEBPACK_IMPORTED_MODULE_1__.BarChartComponent, { ...{\n                    horizontal: true,\n                    height: 400,\n                    notStacked: true,\n                    data: {\n                        xLabels: this.props.selectedTreatments.map((x) => x.treatment.type),\n                        bars: [\n                            {\n                                label: (0,_core__WEBPACK_IMPORTED_MODULE_2__.text)(\"male\").c,\n                                data: this.props.selectedTreatments.map((x) => x.male),\n                            },\n                            {\n                                label: (0,_core__WEBPACK_IMPORTED_MODULE_2__.text)(\"female\").c,\n                                data: this.props.selectedTreatments.map((x) => x.female * -1),\n                            },\n                        ],\n                    },\n                } })));\n    }\n};\nTreatmentsByGenderChart = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([\n    mobx_react__WEBPACK_IMPORTED_MODULE_3__.observer\n], TreatmentsByGenderChart);\n\n\n\n//# sourceURL=webpack://rkds.app/./src/modules/statistics/components/chart.treatments-gender.tsx?\n}");

/***/ }

}]);