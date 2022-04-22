#!/usr/bin/env node
import gulp from 'gulp';
import { program } from 'commander';
import { loadTasks } from './utils/loadTasks';
import { resolveCore } from './utils';
export interface MetaData {
  task: string;
  hrDuration: ReturnType<typeof process.hrtime>;
}
function runTask(taskName: string, rest: string[] = []) {
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
    Reflect.apply(taskInstance, gulp, rest);
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

  program.allowUnknownOption().parse(process.argv);

  const [task, ...rest] = program.args;

  if (!task) {
    program.help();
  } else {
    await loadTasks({
      cwd: resolveCore('tasks'),
    });

    await loadTasks({
      cwd: resolveCore('jobs'),
    });

    await import('./gulpfile');

    await runTask(task, rest);
  }
}
main();
