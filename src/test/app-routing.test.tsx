import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { products, collections } from "@/data/products";

describe("App routing", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

  it("matches a page for / instead of falling back to not found", () => {
    const matches = router.matchRoutes("/");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches all essential e-commerce and policy routes", () => {
    const routesToTest = [
      "/collections",
      "/collections/crystal-trees",
      "/collections/crystal-pyramids",
      "/collections/crystal-bracelets",
      "/collections/malas",
      "/collections/vastu-products",
      "/products/pyrite-tree",
      "/refund-return-policy",
      "/shipping-policy",
      "/privacy-policy",
      "/terms-and-conditions",
      "/about",
      "/blogs",
    ];

    for (const path of routesToTest) {
      const matches = router.matchRoutes(path);
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    }
  });

  it("has exactly 21 required products with valid details and images", () => {
    expect(products.length).toBe(21);

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

  it("has all 5 categories configured", () => {
    expect(collections.length).toBe(5);
  });
});
