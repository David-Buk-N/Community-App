import Link from "next/link";
import { prisma } from "@/lib/db";
import StatusBadge from "@/components/StatusBadge";
import { formatDate } from "@/lib/constants";

export default async function HomePage() {
  const [openCount, inProgressCount, resolvedCount, recentIssues, recentNews] =
    await Promise.all([
      prisma.issue.count({ where: { status: "OPEN" } }),
      prisma.issue.count({ where: { status: "IN_PROGRESS" } }),
      prisma.issue.count({ where: { status: "RESOLVED" } }),
      prisma.issue.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.newsPost.findMany({
        orderBy: { createdAt: "desc" },
        take: 3,
      }),
    ]);

  const stats = [
    { label: "Open", value: openCount, accent: "text-amber-600" },
    { label: "In progress", value: inProgressCount, accent: "text-blue-600" },
    { label: "Resolved", value: resolvedCount, accent: "text-emerald-600" },
  ];

  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 px-6 py-10 text-white">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Your community, in one place
        </h1>
        <p className="mt-3 max-w-2xl text-indigo-100">
          Report local issues, follow their progress, and stay up to date with
          community news.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/issues/new"
            className="rounded-lg bg-white px-4 py-2 font-medium text-indigo-700 hover:bg-indigo-50"
          >
            Report an issue
          </Link>
          <Link
            href="/issues"
            className="rounded-lg border border-white/40 px-4 py-2 font-medium text-white hover:bg-white/10"
          >
            Browse issues
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className={`mt-1 text-3xl font-bold ${stat.accent}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent issues</h2>
            <Link
              href="/issues"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentIssues.length === 0 ? (
              <p className="rounded-lg border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
                No issues reported yet.
              </p>
            ) : (
              recentIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="rounded-lg border border-slate-200 bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium">{issue.title}</p>
                    <StatusBadge status={issue.status} />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {issue.category} · {formatDate(issue.createdAt)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Latest news</h2>
            <Link
              href="/news"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentNews.length === 0 ? (
              <p className="rounded-lg border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
                No news posted yet.
              </p>
            ) : (
              recentNews.map((post) => (
                <div
                  key={post.id}
                  className="rounded-lg border border-slate-200 bg-white p-4"
                >
                  <p className="font-medium">{post.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                    {post.content}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    {post.authorName} · {formatDate(post.createdAt)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
