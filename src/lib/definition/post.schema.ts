import { z } from "zod/v4";

export const CreatePostSchema = z.object({
  title: z.string().min(1, "Field is required"),
  content: z.string().min(1, "Field is required"),
});
