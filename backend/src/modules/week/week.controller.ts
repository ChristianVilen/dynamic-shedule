import { getWeeksWithTasks } from "./week.service";

export async function getWeeksHandler() {
  try {
    const weeks = await getWeeksWithTasks();
    console.log(weeks.map((it) => it.tasks));
    return weeks;
  } catch (e) {
    console.error("failed to get weeks", e);
  }
}
