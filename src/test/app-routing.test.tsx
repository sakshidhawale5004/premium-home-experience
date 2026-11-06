import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { products, collections } from "@/data/products";
import { blogPosts } from "@/data/content";
import { Route as ProductSlugRoute } from "@/routes/products.$slug";
import { Route as CollectionSlugRoute } from "@/routes/collections.$slug";
import { Route as BlogSlugRoute } from "@/routes/blogs.$slug";

describe("App routing", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

  it("matches a page for / instead of falling back to not found", () => {
    const matches = router.matchRoutes("/");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches all essential core pages and policy routes without 404", () => {
    const coreRoutes = [
      "/",
      "/collections",
      "/checkout",
      "/admin",
      "/about",
      "/contact",
      "/blogs",
      "/refund-return-policy",
      "/shipping-policy",
      "/privacy-policy",
      "/terms-and-conditions",
    ];

    for (const path of coreRoutes) {
      const matches = router.matchRoutes(path);
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    }
  });

  it("matches all 5 category collection routes without 404", () => {
    for (const c of collections) {
      const path = `/collections/${c.slug}`;
      const matches = router.matchRoutes(path);
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    }
  });

  it("matches all 21 individual product routes without 404", () => {
    expect(products.length).toBe(21);

    for (const p of products) {
      const path = `/products/${p.slug}`;
      const matches = router.matchRoutes(path);
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    }
  });

  it("matches all blog article routes without 404", () => {
    expect(blogPosts.length).toBeGreaterThan(0);

    for (const post of blogPosts) {
      const path = `/blogs/${post.slug}`;
      const matches = router.matchRoutes(path);
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    }
  });

  it("loads valid products via loader without throwing 404", async () => {
    for (const p of products) {
      const result = await (ProductSlugRoute.options.loader as any)({ params: { slug: p.slug } });
      expect(result.product).toBeDefined();
      expect(result.product.slug).toBe(p.slug);
    }
  });

  it("throws notFound in product loader for invalid slug", async () => {
    await expect(async () => {
      await (ProductSlugRoute.options.loader as any)({ params: { slug: "non-existent-crystal" } });
    }).rejects.toThrow();
  });

  it("loads valid collections via loader without throwing 404", async () => {
    for (const c of collections) {
      const result = await (CollectionSlugRoute.options.loader as any)({ params: { slug: c.slug } });
      expect(result.col).toBeDefined();
      expect(result.col.slug).toBe(c.slug);
    }
  });

  it("throws notFound in collection loader for invalid slug", async () => {
    await expect(async () => {
      await (CollectionSlugRoute.options.loader as any)({ params: { slug: "invalid-collection" } });
    }).rejects.toThrow();
  });

  it("loads valid blog articles via loader without throwing 404", async () => {
    for (const b of blogPosts) {
      const result = await (BlogSlugRoute.options.loader as any)({ params: { slug: b.slug } });
      expect(result.post).toBeDefined();
      expect(result.post.slug).toBe(b.slug);
    }
  });

  it("throws notFound in blog loader for invalid slug", async () => {
    await expect(async () => {
      await (BlogSlugRoute.options.loader as any)({ params: { slug: "invalid-blog-post" } });
    }).rejects.toThrow();
  });

  it("has exactly 21 required products with valid details, images, and pricing", () => {
    for (const p of products) {
      expect(p.slug).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.price).toBeGreaterThan(0);
      expect(p.mrp).toBeGreaterThanOrEqual(p.price);
      expect(p.image).toMatch(/^\/products\/[\w-]+\.jpg$/);
      expect(p.description.length).toBeGreaterThan(0);
      expect(p.benefits.length).toBeGreaterThan(0);
      expect(p.giftIncluded).toBeTruthy();
    }
  });
});
