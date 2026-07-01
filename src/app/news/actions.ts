"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export async function createNewsPost(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
  const authorName = (formData.get("authorName") as string)?.trim();

  if (!title || !content) {
    throw new Error("Title and content are required.");
  }

  await prisma.newsPost.create({
    data: {
      title,
      content,
      authorName: authorName || "Community Team",
    },
  });

  revalidatePath("/news");
  revalidatePath("/");
  redirect("/news");
}
