"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectPath = void 0;
const path_1 = __importDefault(require("path"));
const cwd = process.cwd();
function getProjectPath(...filePath) {
    return path_1.default.join(cwd, ...filePath);
}
exports.getProjectPath = getProjectPath;
