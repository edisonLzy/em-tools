"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = __importDefault(require("gulp"));
const compile_1 = __importDefault(require("./tasks/compile"));
const less_1 = __importDefault(require("./tasks/less"));
gulp_1.default.on('task_start', ({ task, hrDuration }) => {
    console.log(task);
});
gulp_1.default.task('compile-es', (0, compile_1.default)('es'));
gulp_1.default.task('compile-lib', (0, compile_1.default)('lib'));
gulp_1.default.task('compile', gulp_1.default.parallel('compile-es', 'compile-lib'));
gulp_1.default.task('compile:less', (0, less_1.default)({}));
