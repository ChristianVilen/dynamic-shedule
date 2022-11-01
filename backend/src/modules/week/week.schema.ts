import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";
import { taskResponseSchema } from "../task/task.schema";

const weekInput = {
  weekNumber: z.number({
    required_error: "weekNumber required",
    invalid_type_error: "weekNumber type must be number",
  }),
  tasks: z.array(taskResponseSchema),
};

const weekGenerated = {
  id: z.number(),
  updatedAt: z.string(),
  createdAt: z.string(),
  deletedAt: z.string(),
};

const creatWeekSchema = z.object(weekInput);

const weekResponseSchema = z.object({
  ...weekInput,
  ...weekGenerated,
});

const weeksResponseSchema = z.array(weekResponseSchema);

export const { schemas: weekSchemas, $ref } = buildJsonSchemas(
  {
    creatWeekSchema,
    weekResponseSchema,
    weeksResponseSchema,
  },
  { $id: "weekSchema" }
);
