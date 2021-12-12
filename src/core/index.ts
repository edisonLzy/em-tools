#!/usr/bin/env node
import gulp from 'gulp';
import { program } from 'commander';
export interface MetaData {
  task: string;
  hrDuration: ReturnType<typeof process.hrtime>;
}
function runTask(taskName: string) {
  const metadata: MetaData = { task: taskName, hrDuration: [0, 0] };
  // 只 转入名称会返回 注册的函数
  const taskInstance = gulp.task(taskName);
  if (taskInstance === undefined) {
    gulp.emit('task_not_found', metadata);
    return;
  }
  const start = process.hrtime();
  gulp.emit('task_start', metadata);
  try {
    Reflect.apply(taskInstance, gulp, []);
    metadata.hrDuration = process.hrtime(start);
    gulp.emit('task_stop', metadata);
    gulp.emit('stop');
  } catch (err: any) {
    err.hrDuration = process.hrtime(start);
    err.task = metadata.task;
    gulp.emit('task_err', err);
  }
}

async function main() {
  program.on('--help', () => {
    console.log('  Usage:');
    console.log();
  });

  program.parse(process.argv);

  const task = program.args[0];
  if (!task) {
    program.help();
  } else {
    console.log('em-tools run', task);
    await import('./gulpfile');
    await runTask(task);
  }
}
main();
