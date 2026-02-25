import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/residency",
    "/canvas",
    "/residency/apply",
    "/blog",
    "/company",
    "/community",
    "/residents",
    "/contact",
    "/residency/showandtell",
    "/start",
    "/privacy",
    "/terms",
  ];

  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  blogPosts.forEach((post) => {
    routes.push({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : new Date(),
    });
  });

  return routes;
}
