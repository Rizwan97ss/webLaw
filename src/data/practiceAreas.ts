import {
  Building2,
  Scale,
  HeartHandshake,
  Home,
  Shield,
  Landmark,
} from "lucide-react";

export const practiceAreas = [
  {
    id: 1,
    slug: "corporate-business-law",
    title: "Corporate & Business Law",
    icon: Building2,
    description:
      "Navigating entity formation, contract negotiations, mergers, acquisitions, and regulatory compliance.",
    featured: true,
  },

  {
    id: 2,
    slug: "family-law-mediation",
    title: "Family Law & Mediation",
    icon: HeartHandshake,
    description:
      "Guiding families through divorce, child custody, mediation, and asset division.",
    featured: true,
  },

  {
    id: 3,
    slug: "personal-injury-litigation",
    title: "Personal Injury Litigation",
    icon: Scale,
    description:
      "Aggressive representation for accident victims seeking fair compensation.",
    featured: true,
  },

  {
    id: 4,
    slug: "estate-planning-probate",
    title: "Estate Planning & Probate",
    icon: Home,
    description:
      "Protecting your legacy through wills, trusts, and estate administration.",
    featured: false,
  },

  {
    id: 5,
    slug: "criminal-defense",
    title: "Criminal Defense",
    icon: Shield,
    description:
      "Protecting constitutional rights in state and federal criminal matters.",
    featured: false,
  },

  {
    id: 6,
    slug: "real-estate-law",
    title: "Real Estate Law",
    icon: Landmark,
    description:
      "Handling residential and commercial property transactions and disputes.",
    featured: false,
  },
];