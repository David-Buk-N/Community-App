"use client";

import { useTransition } from "react";
import type { IssueStatus } from "@prisma/client";
import { ISSUE_STATUSES, STATUS_META } from "@/lib/constants";
import { updateIssueStatus } from "@/app/issues/actions";

export default function StatusSelect({
  id,
  status,
}: {
  id: string;
  status: IssueStatus;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <label className="flex items-center gap-2 text-xs text-slate-500">
      <span className="sr-only">Update status</span>
      <select
        defaultValue={status}
        disabled={pending}
        onChange={(event) => {
          const formData = new FormData();
          formData.set("id", id);
          formData.set("status", event.target.value);
          startTransition(() => updateIssueStatus(formData));
        }}
        className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 disabled:opacity-50"
      >
        {ISSUE_STATUSES.map((value) => (
          <option key={value} value={value}>
            {STATUS_META[value].label}
          </option>
        ))}
      </select>
    </label>
  );
}
