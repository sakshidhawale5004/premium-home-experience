import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { blogPosts } from "@/data/content";
import { STORE } from "@/data/products";

export const Route = createFileRoute("/blogs/$slug")({
  head: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    return {
      meta: [
        { title: post ? `${post.title} | Vastu Adda` : "Article | Vastu Adda" },
        {
          name: "description",
          content: post?.excerpt ?? "Vastu insights from the Vastu Adda journal.",
        },
        {
          property: "og:title",
          content: post ? `${post.title} | Vastu Adda` : "Article | Vastu Adda",
        },
        {
          property: "og:description",
          content: post?.excerpt ?? "Vastu insights from the Vastu Adda journal.",
        },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    throw notFound();
  }

  const others = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article>
      <header className="bg-secondary/70 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="eyebrow text-gold-deep">{post.category}</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-forest md:text-5xl">
            {post.title}
          </h1>
          <div className="gold-line mx-auto mt-5 w-28" />
          <p className="mt-4 text-sm text-muted-foreground">
            {post.date} · {post.readTime}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-14">
        <p className="font-display text-xl leading-relaxed text-forest/90">{post.excerpt}</p>
        <div className="mt-8 space-y-5 leading-relaxed text-foreground/80">
          {post.content.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-gold/40 bg-secondary/70 p-7 text-center">
          <p className="font-display text-2xl font-semibold text-forest">
            Want guidance for your own space?
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Our Vastu consultants recommend remedies tailored to your home or office.
          </p>
          <a
            href={STORE.whatsapp}
            className="mt-5 inline-block rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-forest/90"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <section className="bg-secondary/60 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-gold-deep">Keep Reading</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-forest">
              More from the Journal
            </h2>
            <div className="gold-line mx-auto mt-4 w-24" />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {others.map((p) => (
              <Link
                key={p.slug}
                to="/blogs/$slug"
                params={{ slug: p.slug }}
                className="card-lift group flex flex-col rounded-2xl border border-border bg-card p-6"
              >
                <p className="eyebrow text-gold-deep">{p.category}</p>
                <h3 className="mt-3 flex-1 font-display text-xl font-semibold leading-snug text-forest">
                  {p.title}
                </h3>
                <p className="mt-4 text-sm font-medium text-gold-deep transition-transform group-hover:translate-x-1">
                  Read →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
