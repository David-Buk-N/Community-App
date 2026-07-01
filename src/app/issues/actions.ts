"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { IssueStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { ISSUE_CATEGORIES, ISSUE_STATUSES } from "@/lib/constants";

export async function createIssue(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const categoryRaw = (formData.get("category") as string)?.trim();
  const location = (formData.get("location") as string)?.trim();
  const authorName = (formData.get("authorName") as string)?.trim();

  if (!title || !description) {
    throw new Error("Title and description are required.");
  }

  const category = ISSUE_CATEGORIES.includes(
    categoryRaw as (typeof ISSUE_CATEGORIES)[number],
  )
    ? categoryRaw
    : "General";

  await prisma.issue.create({
    data: {
      title,
      description,
      category,
      location: location || null,
      authorName: authorName || "Anonymous",
    },
  });

  revalidatePath("/issues");
  revalidatePath("/");
  redirect("/issues");
}

export async function updateIssueStatus(formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as IssueStatus;

  if (!id || !ISSUE_STATUSES.includes(status)) {
    throw new Error("Invalid status update.");
  }

  await prisma.issue.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/issues");
  revalidatePath("/");
}
