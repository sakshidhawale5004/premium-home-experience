import { createFileRoute, Link, Outlet, useLocation, useChildMatches } from "@tanstack/react-router";
import { blogPosts } from "@/data/content";

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      {
        title: "Vastu Insights & Spiritual Blogs | Vastu Adda",
      },
      {
        name: "description",
        content:
          "Practical Vastu tips, crystal wisdom, rudraksha rituals and sacred guidance for everyday homes and workplaces.",
      },
      {
        property: "og:title",
        content: "Vastu Insights & Spiritual Blogs | Vastu Adda",
      },
      {
        property: "og:description",
        content: "Vastu tips for home and office, crystal placement and Vedic wisdom.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Blogs,
});

function Blogs() {
  const location = useLocation();
  const childMatches = useChildMatches();

  if (childMatches.length > 0 || (location.pathname !== "/blogs" && location.pathname !== "/blogs/")) {
    return <Outlet />;
  }

  return (
    <div>
      <section className="bg-secondary/70 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="eyebrow text-gold-deep">Vastu Insights &amp; Tips</p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold text-forest">
            Read. Learn. Harmonise.
          </h1>
          <div className="gold-line mx-auto mt-5 w-28" />
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Practical guidance from the world of Vastu Shastra, crystals and sacred tradition —
            written for real homes, real offices and everyday life.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to="/blogs/$slug"
              params={{ slug: post.slug }}
              className="card-lift group flex flex-col rounded-2xl border border-border bg-card p-7 shadow-sm hover:border-gold/50"
            >
              <p className="eyebrow text-gold-deep">{post.category}</p>
              <h2 className="mt-3 flex-1 font-display text-2xl font-semibold leading-snug text-forest group-hover:text-gold-deep transition-colors">
                {post.title}
              </h2>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
              <p className="mt-5 flex items-center justify-between text-xs text-muted-foreground border-t border-border/60 pt-4">
                <span>
                  {post.date} · {post.readTime}
                </span>
                <span className="font-semibold text-gold-deep transition-transform group-hover:translate-x-1">
                  Read Article →
                </span>
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
