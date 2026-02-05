import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPost from "@/views/BlogPost";
import { blogPosts, getBlogPost } from "@/lib/blog-data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Post not found",
      description: "This post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.summary ?? "Residency updates from Malaysian AI.",
    openGraph: {
      title: post.title,
      description: post.summary ?? "Residency updates from Malaysian AI.",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary ?? "Residency updates from Malaysian AI.",
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPost post={post} />;
}
