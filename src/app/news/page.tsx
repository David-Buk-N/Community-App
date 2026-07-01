import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/constants";

export default async function NewsPage() {
  const posts = await prisma.newsPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Community news</h1>
          <p className="text-sm text-slate-500">
            Announcements and updates for the community.
          </p>
        </div>
        <Link
          href="/news/new"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Post news
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-slate-500">No news posted yet.</p>
          <Link
            href="/news/new"
            className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            Post the first update
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-xl border border-slate-200 bg-white p-6"
            >
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="mt-1 text-xs text-slate-500">
                {post.authorName} · {formatDate(post.createdAt)}
              </p>
              <p className="mt-3 whitespace-pre-wrap text-sm text-slate-700">
                {post.content}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
