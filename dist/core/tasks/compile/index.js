"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = __importDefault(require("gulp"));
const less_1 = __importDefault(require("../less"));
const tsx_1 = __importDefault(require("../tsx"));
const utils_1 = require("../../utils");
const sourceGlob = {
    styles: ['components/**/*.less'],
};
const libDir = (0, utils_1.getProjectPath)('lib');
const esDir = (0, utils_1.getProjectPath)('es');
function compile(target) {
    const outDir = target === 'es' ? esDir : libDir;
    return gulp_1.default.parallel((0, less_1.default)({
        sourceDir: sourceGlob['styles'],
        outDir: outDir,
    }), (0, tsx_1.default)());
}
exports.default = compile;
