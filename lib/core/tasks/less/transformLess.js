"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformLess = void 0;
const less_1 = __importDefault(require("less"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const postcss_1 = __importDefault(require("postcss"));
const less_plugin_npm_import_1 = __importDefault(require("less-plugin-npm-import"));
const autoprefixer_1 = __importDefault(require("autoprefixer"));
function transformLess(lessFile, config = {
    cwd: process.cwd(),
}) {
    const { cwd } = config;
    const resolvedLessFile = path_1.default.resolve(cwd, lessFile);
    console.log(resolvedLessFile);
    let data = (0, fs_1.readFileSync)(resolvedLessFile, 'utf-8');
    data = data.replace(/^\uFEFF/, '');
    // Do less compile
    const lessOpts = {
        paths: [path_1.default.dirname(resolvedLessFile)],
        filename: resolvedLessFile,
        plugins: [new less_plugin_npm_import_1.default({ prefix: '~' })],
        javascriptEnabled: true,
    };
    return less_1.default
        .render(data, lessOpts)
        .then((result) => (0, postcss_1.default)([autoprefixer_1.default]).process(result.css, { from: undefined }))
        .then((r) => {
        return r.css;
    });
}
exports.transformLess = transformLess;
//# sourceMappingURL=transformLess.js.map