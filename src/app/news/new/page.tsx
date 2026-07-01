import Link from "next/link";
import { createNewsPost } from "@/app/news/actions";

export default function NewNewsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link
          href="/news"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          ← Back to news
        </Link>
        <h1 className="mt-2 text-2xl font-bold">Post community news</h1>
        <p className="text-sm text-slate-500">
          Share an announcement or update with the community.
        </p>
      </div>

      <form
        action={createNewsPost}
        className="space-y-5 rounded-xl border border-slate-200 bg-white p-6"
      >
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            required
            maxLength={140}
            placeholder="e.g. Road closure this weekend"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium">
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={6}
            placeholder="Write your announcement here."
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="authorName" className="block text-sm font-medium">
            Author
          </label>
          <input
            id="authorName"
            name="authorName"
            maxLength={80}
            placeholder="Optional — defaults to Community Team"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Publish
          </button>
          <Link
            href="/news"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
