"use server";

import { CreatePostSchema } from "@/lib/definition/post.schema";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod/v4";

export async function createPost(state: unknown, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  const validationResult = CreatePostSchema.safeParse({
    title,
    content,
  });

  if (!validationResult.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: z.flattenError(validationResult.error).fieldErrors,
    };
  }

  await prisma.post.create({
    data: {
      title: title,
      content: content,
    },
  });

  revalidatePath("/post-form");

  return {
    success: true,
    message: "Success",
    errors: {},
  };
}

export async function getPost() {
  return await prisma.post.findMany();
}
