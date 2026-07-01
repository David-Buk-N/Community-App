import type { IssueStatus } from "@prisma/client";

export const ISSUE_CATEGORIES = [
  "General",
  "Roads & Traffic",
  "Sanitation",
  "Water & Power",
  "Safety",
  "Parks & Recreation",
  "Noise",
] as const;

export const ISSUE_STATUSES: IssueStatus[] = ["OPEN", "IN_PROGRESS", "RESOLVED"];

export const STATUS_META: Record<
  IssueStatus,
  { label: string; badge: string }
> = {
  OPEN: {
    label: "Open",
    badge: "bg-amber-100 text-amber-800 ring-amber-200",
  },
  IN_PROGRESS: {
    label: "In progress",
    badge: "bg-blue-100 text-blue-800 ring-blue-200",
  },
  RESOLVED: {
    label: "Resolved",
    badge: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  },
};

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
