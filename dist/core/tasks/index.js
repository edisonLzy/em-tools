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
exports.loadTask = void 0;
const gulp_1 = __importDefault(require("gulp"));
const path_1 = __importDefault(require("path"));
const p_map_1 = __importDefault(require("p-map"));
const fast_glob_1 = __importDefault(require("fast-glob"));
gulp_1.default.on('task_start', () => { });
async function loadTask() {
    const tasks = await (0, fast_glob_1.default)('*', {
        onlyDirectories: true,
        cwd: __dirname,
    });
    const loadTasks = await (0, p_map_1.default)(tasks, async (task) => {
        const { default: _task } = await Promise.resolve().then(() => __importStar(require(path_1.default.resolve(__dirname, task))));
        // 注册任务
        gulp_1.default.task(_task);
    });
    try {
        await Promise.all(loadTasks);
    }
    catch (e) {
        console.log(e);
    }
}
exports.loadTask = loadTask;
