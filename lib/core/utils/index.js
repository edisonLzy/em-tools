"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveArgs = exports.resolveCore = exports.getProjectPath = void 0;
const path_1 = __importDefault(require("path"));
const lodash_1 = require("lodash");
const cwd = process.cwd();
function getProjectPath(...filePath) {
    return path_1.default.join(cwd, ...filePath);
}
exports.getProjectPath = getProjectPath;
function resolveCore(...filePath) {
    return path_1.default.resolve(__dirname, '..', ...filePath);
}
exports.resolveCore = resolveCore;
function resolveArgs(args) {
    return (0, lodash_1.chunk)(args).reduce((acc, cur) => {
        const [key, value = ''] = cur;
        const _key = (0, lodash_1.replace)(key, '-', '');
        acc[_key] = value;
        return acc;
    }, {});
}
exports.resolveArgs = resolveArgs;
//# sourceMappingURL=index.js.map