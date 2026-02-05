import type { ComponentType } from "react";
import { CleveAI, DocuAsk, ReplyrAI, ResidentImages, Robin } from "@/components/ResidentLogos";

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
      "Conversational AI tooling for fast-moving support teams. Automates triage, drafts, and QA so agents close tickets faster with consistent quality.",
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
      "Knowledge workflows that turn messy data into decisions. Connects internal docs, data, and conversations so teams can search, cite, and act with confidence.",
    focus: "Knowledge Systems",
    location: "Penang",
    cohort: "Cohort 01",
    status: "Active",
    tags: ["RAG", "Operations", "Search"],
    component: CleveAI,
    href: "https://cleve.ai",
  },
  {
    name: "Robin",
    description:
      "AI copilots built for compliance-heavy workstreams. Streamlines contract review and approvals while keeping audit trails and policy controls intact.",
    focus: "Legal & Compliance",
    location: "Kuala Lumpur",
    cohort: "Cohort 01",
    status: "Active",
    tags: ["Contracts", "Enterprise", "Trust"],
    component: Robin,
    href: "https://robinai.com",
  },
  {
    name: "DocuAsk",
    description:
      "Document intelligence with audit-ready insights. Extracts, compares, and summarizes complex files for faster reviews and reporting.",
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
      "Applied AI for next-generation industry operations. Delivers predictive maintenance, optimization, and frontline tools for factories and field teams.",
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
      "Voice-driven interfaces for high-stakes workflows. Turns spoken input into structured actions for operations, care, and safety teams.",
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
      "AI-powered guidance for career and learning journeys. Matches users to pathways, mentors, and resources with personalized next steps.",
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
      "Learning experiences designed for modern teams. Blends short-form content, cohorts, and hands-on projects for practical upskilling.",
    focus: "Education",
    location: "Kuala Lumpur",
    cohort: "Cohort 01",
    status: "Active",
    tags: ["Learning", "Content", "Growth"],
    image: ResidentImages.kelassekejap,
    href: "https://kelassekejap.com",
  },
];
