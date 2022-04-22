"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = __importDefault(require("gulp"));
const through2_1 = __importDefault(require("through2"));
const lodash_1 = require("lodash");
const utils_1 = require("../../utils");
const transformLess_1 = require("./transformLess");
function less(...args) {
    const { s: source = (0, utils_1.getProjectPath)('src/*.less'), d: dest = 'dist' } = (0, utils_1.resolveArgs)(args);
    return gulp_1.default
        .src(source)
        .pipe(through2_1.default.obj(function (file, encoding, next) {
        if ((0, lodash_1.endsWith)(file.path, '.less')) {
            (0, transformLess_1.transformLess)(file.path)
                .then((css) => {
                file.contents = Buffer.from(css);
                file.path = file.path.replace(/\.less$/, '.css');
                this.push(file);
                next();
            })
                .catch((e) => {
                console.error(e);
            });
        }
        else {
            next();
        }
    }))
        .pipe(gulp_1.default.dest(dest));
}
exports.default = less;
//# sourceMappingURL=index.js.map