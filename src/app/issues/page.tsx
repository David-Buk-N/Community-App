import Link from "next/link";
import type { IssueStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import StatusBadge from "@/components/StatusBadge";
import StatusSelect from "@/components/StatusSelect";
import { ISSUE_STATUSES, STATUS_META, formatDate } from "@/lib/constants";

export default async function IssuesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const activeStatus = ISSUE_STATUSES.includes(status as IssueStatus)
    ? (status as IssueStatus)
    : undefined;

  const where: Prisma.IssueWhereInput = activeStatus
    ? { status: activeStatus }
    : {};

  const issues = await prisma.issue.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const filters: { label: string; value?: IssueStatus }[] = [
    { label: "All" },
    ...ISSUE_STATUSES.map((value) => ({ label: STATUS_META[value].label, value })),
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Community issues</h1>
          <p className="text-sm text-slate-500">
            {issues.length} {issues.length === 1 ? "issue" : "issues"}
            {activeStatus ? ` · ${STATUS_META[activeStatus].label}` : ""}
          </p>
        </div>
        <Link
          href="/issues/new"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Report an issue
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isActive = activeStatus === filter.value;
          return (
            <Link
              key={filter.label}
              href={filter.value ? `/issues?status=${filter.value}` : "/issues"}
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
              }`}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>

      {issues.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-slate-500">No issues here yet.</p>
          <Link
            href="/issues/new"
            className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            Be the first to report one
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {issues.map((issue) => (
            <li
              key={issue.id}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold">{issue.title}</h2>
                    <StatusBadge status={issue.status} />
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    {issue.description}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    {issue.category}
                    {issue.location ? ` · ${issue.location}` : ""} ·{" "}
                    {issue.authorName} · {formatDate(issue.createdAt)}
                  </p>
                </div>
                <StatusSelect id={issue.id} status={issue.status} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
