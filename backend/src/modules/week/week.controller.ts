import { getWeeksWithTasks } from "./week.service";

export async function getWeeksHandler() {
  try {
    return await getWeeksWithTasks();
  } catch (e) {
    console.error("failed to get weeks", e);
  }
}
