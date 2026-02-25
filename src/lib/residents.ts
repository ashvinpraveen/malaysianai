import type { ComponentType } from "react";
import { CleveAI, DocuAsk, ReplyrAI, ResidentImages } from "@/components/ResidentLogos";

export type Resident = {
  name: string;
  description: string;
  focus: string;
  location: string;
  cohort: string;
  status: string;
  tags: string[];
  href?: string;
  component?: ComponentType<{ className?: string }>;
  image?: string;
};

export const residents: Resident[] = [
  {
    name: "ReplyrAI",
    description:
      "AI growth platform for clinics that turns inbound chats into booked patients. It combines AI chat, lead follow-up, and appointment workflows to help teams convert more enquiries.",
    focus: "Customer Experience",
    location: "Kuala Lumpur",
    cohort: "Cohort 02",
    status: "Active",
    tags: ["Support", "Automation", "B2B"],
    component: ReplyrAI,
    href: "https://replyr.ai",
  },
  {
    name: "Cleve",
    description:
      "Personal AI content assistant that learns from your notes, emails, and social profiles. Cleve helps users capture ideas and turn them into posts, blogs, and scripts in their own voice.",
    focus: "Knowledge Systems",
    location: "Penang",
    cohort: "Cohort 01",
    status: "Active",
    tags: ["RAG", "Operations", "Search"],
    component: CleveAI,
    href: "https://cleve.ai",
  },
  {
    name: "DocuAsk",
    description:
      "No-code document chatbot platform that turns company files into searchable AI assistants. Teams can upload manuals, PDFs, and internal content so customers and staff can chat with their knowledge base.",
    focus: "Document AI",
    location: "Johor Bahru",
    cohort: "Cohort 02",
    status: "Active",
    tags: ["Analysis", "Knowledge", "Workflow"],
    component: DocuAsk,
    href: "https://docuask.com",
  },
  {
    name: "Blue Bolt Labs",
    description:
      "MVP studio for solo founders that ships launch-ready products in a focused 21-day sprint. Blue Bolt Labs handles scoping, build, and handover so founders can validate ideas quickly with real users.",
    focus: "Industry 4.0",
    location: "Shah Alam",
    cohort: "Cohort 02",
    status: "Active",
    tags: ["Automation", "IoT", "Field Ops"],
    image: ResidentImages.bluebolt,
    href: "https://blueboltlabs.com",
  },
  {
    name: "Seavoice",
    description:
      "Enterprise voice AI platform for customer support, outbound sales, and appointment booking. Seavoice deploys human-like call agents with CRM and telephony integrations, including local-language conversations.",
    focus: "Voice & Speech",
    location: "Kota Kinabalu",
    cohort: "Cohort 01",
    status: "Active",
    tags: ["Voice", "Assistive", "Real-time"],
    image: ResidentImages.seavoice,
    href: "https://seavoice.ai",
  },
  {
    name: "Klovr",
    description:
      "AI assistant for real estate sales teams that runs directly inside WhatsApp. Klovr captures top-agent playbooks from chat activity and gives junior agents instant reply guidance to improve conversions.",
    focus: "Education",
    location: "Petaling Jaya",
    cohort: "Cohort 02",
    status: "Active",
    tags: ["Coaching", "Personalization", "Community"],
    image: ResidentImages.klovr,
    href: "https://klovr.co/",
  },
  {
    name: "Kelas Sekejap",
    description:
      "Malaysia-first AI English app focused on learning by speaking, not memorisation. Kelas Sekejap uses guided real-world conversations and instant feedback to build practical confidence.",
    focus: "Education",
    location: "Kuala Lumpur",
    cohort: "Cohort 01",
    status: "Active",
    tags: ["Learning", "Content", "Growth"],
    image: ResidentImages.kelassekejap,
    href: "https://kelassekejap.com",
  },
];
