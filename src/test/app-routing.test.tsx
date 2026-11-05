import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { products, collections } from "@/data/products";
import { blogPosts } from "@/data/content";

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
      "/about",
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
