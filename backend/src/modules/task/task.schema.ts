import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const taskInput = {
  weekday: z.string({
    required_error: "weekday required",
    invalid_type_error: "weekday type must be string",
  }),
  title: z
    .string({
      required_error: "title required",
      invalid_type_error: "title type must be string",
    })
    .optional(),
  completed: z.boolean({
    required_error: "completed required",
    invalid_type_error: "completed type must be boolean",
  }),
  weekId: z.number({
    required_error: "weekId required",
    invalid_type_error: "weekId type must be string",
  }),
};

const taskGenerated = {
  id: z.number(),
  updatedAt: z.string(),
  createdAt: z.string(),
  deletedAt: z.string(),
};

const creatTaskSchema = z.object(taskInput);

const updateTaskSchema = z.object({
  id: z.number(),
  weekday: z.string().optional(),
  title: z.string().optional(),
  completed: z.boolean().optional(),
  weekId: z.number().optional(),
});

export const taskResponseSchema = z.object({
  ...taskInput,
  ...taskGenerated,
});

const tasksResponseSchema = z.array(taskResponseSchema);

export type CreateTaskInput = z.infer<typeof creatTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

export const { schemas: taskSchemas, $ref } = buildJsonSchemas(
  {
    creatTaskSchema,
    updateTaskSchema,
    taskResponseSchema,
    tasksResponseSchema,
  },
  { $id: "taskSchema" }
);
