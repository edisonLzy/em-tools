import gulp from 'gulp';
import fg from 'fast-glob';
import path from 'path';
async function loadTask(task: string, cwd: Op['cwd']) {
  const taskPath = path.join(cwd, task, 'index.js');
  const { default: handler } = await import(taskPath);
  gulp.task(task, handler);
}
// 自动注册task
interface Op {
  cwd: string;
}

export async function loadTasks({ cwd }: Op) {
  const tasks = await fg('*', {
    cwd: cwd,
    onlyDirectories: true,
  });
  await Promise.all(
    tasks.map((task) => {
      return loadTask(task, cwd);
    })
  );
}
