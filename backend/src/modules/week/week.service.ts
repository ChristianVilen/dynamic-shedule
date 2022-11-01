import prisma from "../../utils/prisma";

export async function getWeeksWithTasks() {
  return await prisma.week.findMany({
    select: {
      id: true,
      weekNumber: true,
      tasks: {
        select: {
          id: true,
          title: true,
          weekday: true,
          weekId: true,
          completed: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      },
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });
}
