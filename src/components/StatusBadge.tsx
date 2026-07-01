import type { IssueStatus } from "@prisma/client";
import { STATUS_META } from "@/lib/constants";

export default function StatusBadge({ status }: { status: IssueStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${meta.badge}`}
    >
      {meta.label}
    </span>
  );
}
