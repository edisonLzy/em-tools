"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTasks = void 0;
const gulp_1 = __importDefault(require("gulp"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const path_1 = __importDefault(require("path"));
async function loadTask(task) {
    const taskPath = path_1.default.join(__dirname, task, 'index.js');
    const { default: handler } = await Promise.resolve().then(() => __importStar(require(taskPath)));
    gulp_1.default.task(task, handler);
}
// 自动注册task
async function loadTasks() {
    const tasks = await (0, fast_glob_1.default)('*', {
        cwd: __dirname,
        onlyDirectories: true,
    });
    await Promise.all(tasks.map(loadTask));
}
exports.loadTasks = loadTasks;
//# sourceMappingURL=load.js.map