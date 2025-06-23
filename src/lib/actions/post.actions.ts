"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";

export async function createPostWithFormData(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  await prisma.post.create({
    data: {
      title: title,
      content: content,
    },
  });

  revalidatePath("/post-form");
}
