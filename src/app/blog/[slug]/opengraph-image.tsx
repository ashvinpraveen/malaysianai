import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";
import { blogPosts, getBlogPost } from "@/lib/blog-data";

export const alt = "Blog Post | Malaysian AI";
export const size = ogSize;
export const contentType = ogContentType;
export const dynamic = "force-static";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  return generateOgImage(
    post?.title ?? "Updates",
    post?.summary ?? "Residency updates from Malaysian AI."
  );
}
