import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { blogPosts } from "@/data/content";

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      {
        title: "Vastu Insights & Blogs | Vastu Adda",
      },
      {
        name: "description",
        content:
          "Practical Vastu tips, crystal wisdom and sacred tradition from the Vastu Adda journal — written for everyday homes and workplaces.",
      },
      {
        property: "og:title",
        content: "Vastu Insights & Blogs | Vastu Adda",
      },
      {
        property: "og:description",
        content:
          "Vastu tips for home and office, crystal guides and rudraksh wisdom — read the Vastu Adda journal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Blogs,
});

function Blogs() {
  return (
    <div>
      <section className="bg-secondary/70 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="eyebrow text-gold-deep">Vastu Insights & Tips</p>
          <h1 className="mt-4 font-display text-5xl font-semibold text-forest">
            Read. Learn. Harmonise.
          </h1>
          <div className="gold-line mx-auto mt-5 w-28" />
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Practical guidance from the world of Vastu Shastra, crystals and sacred tradition —
            written for real homes, real offices and everyday life.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to="/blogs/$slug"
              params={{ slug: post.slug }}
              className="card-lift group flex flex-col rounded-2xl border border-border bg-card p-7"
            >
              <p className="eyebrow text-gold-deep">{post.category}</p>
              <h2 className="mt-3 flex-1 font-display text-2xl font-semibold leading-snug text-forest">
                {post.title}
              </h2>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
              <p className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {post.date} · {post.readTime}
                </span>
                <span className="font-medium text-gold-deep transition-transform group-hover:translate-x-1">
                  Read →
                </span>
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
