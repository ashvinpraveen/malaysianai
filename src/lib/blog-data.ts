export type BlogCategory = "announcements" | "cohort-stories" | "curriculum";

export type BlogContentBlock = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  quote?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  summary?: string;
  category?: BlogCategory;
  author?: string;
  date?: string;
  readingTime?: string;
  cover?: string;
  content: BlogContentBlock[];
};

export const categoryMetadata: Record<
  BlogCategory,
  { title: string; description: string; badge: string; accent: string }
> = {
  announcements: {
    title: "Announcements",
    description: "Program news, application windows, and key dates.",
    badge: "ANN",
    accent: "from-primary/80 via-primary/40 to-transparent",
  },
  "cohort-stories": {
    title: "Cohort Stories",
    description: "What residents are building across Malaysia.",
    badge: "COH",
    accent: "from-primary/70 via-primary/30 to-transparent",
  },
  curriculum: {
    title: "Curriculum",
    description: "How we teach, mentor, and ship applied AI projects.",
    badge: "CUR",
    accent: "from-primary/60 via-primary/25 to-transparent",
  },
};

export const categories: Array<{ label: string; href: string; value: BlogCategory | null }> = [
  { label: "Latest", href: "/blog", value: null },
  { label: "Announcements", href: "/blog?category=announcements", value: "announcements" },
  { label: "Cohort Stories", href: "/blog?category=cohort-stories", value: "cohort-stories" },
  { label: "Curriculum", href: "/blog?category=curriculum", value: "curriculum" },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "applications-open-2026",
    title: "Applications open for the 2026 cohort",
    summary: "We're now accepting applications for the next Malaysian AI Residency cohort.",
    category: "announcements",
    author: "Residency Team",
    date: "2026-02-03",
    readingTime: "3 min read",
    content: [
      {
        heading: "Who should apply",
        paragraphs: [
          "We welcome founders, engineers, researchers, and product leaders who want to build real AI products in Malaysia.",
          "Ideal applicants are curious, collaborative, and ready to commit to a structured build cycle.",
        ],
        bullets: [
          "Builders with a clear problem statement",
          "Teams looking for partner access and mentorship",
          "Researchers ready to translate work into products",
        ],
      },
      {
        heading: "What to expect",
        paragraphs: [
          "The residency includes onboarding, sprint cycles, mentor reviews, and a public demo day.",
        ],
        quote: "We're focused on shipping meaningful AI products with local impact.",
      },
    ],
  },
  {
    slug: "inside-the-curriculum",
    title: "Inside the residency curriculum",
    summary: "A closer look at the sprint cadence, mentor touchpoints, and deliverables.",
    category: "curriculum",
    author: "Residency Team",
    date: "2026-02-03",
    readingTime: "4 min read",
    content: [
      {
        heading: "Sprint cadence",
        paragraphs: [
          "Each cohort follows a structured sprint rhythm with weekly demos, retrospectives, and mentor feedback.",
        ],
      },
      {
        heading: "Deliverables",
        bullets: [
          "Problem statement and partner brief",
          "Prototype and pilot plan",
          "Demo day narrative and metrics",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string | undefined) {
  if (!slug) return undefined;
  return blogPosts.find((post) => post.slug === slug);
}
