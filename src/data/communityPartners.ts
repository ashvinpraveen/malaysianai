export type CommunityPartner = {
  name: string;
  href: string;
  logo: string;
  summary: string;
};

export const communityPartners: CommunityPartner[] = [
  {
    name: "Build Club",
    href: "https://www.buildclub.ai",
    logo: "/build-club-logo-navbar.webp",
    summary:
      "A collaborative AI learning community focused on learning through building, with AI-native courses, role tracks, and certifications. It brings together young professionals, AI evangelists, agencies, and solopreneurs who want to grow their skills with a builder community.",
  },
  {
    name: "Build with AI",
    href: "https://buildwithai.my/",
    logo: "/build_with_ai_logo.jpeg",
    summary:
      "A project showcase for the Build With AI Malaysia community, featuring AI projects built by Malaysian builders across many categories. It helps people discover what locals are creating and invites builders to explore projects or join the community.",
  },
  {
    name: "AI Tinkerers",
    href: "https://aitinkerers.org",
    logo: "/ai_tinkerers_logo.png",
    summary:
      "A global community of AI engineers and researchers building real systems and sharing unfinished work. It runs local meetups centered on demos, code, and technical insights while connecting builders through a global network.",
  },
  {
    name: "AI Hackerdorm",
    href: "https://aihackerdorm.com",
    logo: "/ai_hackerdorm.webp",
    summary:
      "A student-first community that hosts regular builder sessions with project showcases, co-building time, and mentorship. It welcomes coders, designers, entrepreneurs, and curious makers who want to build and learn together.",
  },
  {
    name: "AI SEA",
    href: "https://www.aisea.builders",
    logo: "/aisea_logo.png",
    summary:
      "A Southeast Asia grassroots builder movement and network for people shipping AI that connects local communities into a coalition. They run hackathons, co-build sessions, and sprints while sharing infrastructure for cross-border collaboration.",
  },
  {
    name: "Rakan Tutor",
    href: "https://rakantutor.org",
    logo: "/rakan-tutor-logo.png",
    summary:
      "An organization providing free, hybrid AI programs for ASEAN youth through hands-on workshops and a digital learning platform. Its mission is to equip secondary school students with the skills and confidence for an AI-powered future.",
  },
];
