"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = __importDefault(require("gulp"));
const through2_1 = __importDefault(require("through2"));
const transformLess_1 = require("./transformLess");
function default_1({ sourceDir, outDir }) {
    return () => {
        return gulp_1.default
            .src(sourceDir)
            .pipe(through2_1.default.obj(function (file, encoding, next) {
            if (file.path.match(/(\/|\\)style(\/|\\)index\.less$/) ||
                file.path.match(/(\/|\\)style(\/|\\)v2-compatible-reset\.less$/)) {
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
            .pipe(gulp_1.default.dest(outDir));
    };
}
exports.default = default_1;
