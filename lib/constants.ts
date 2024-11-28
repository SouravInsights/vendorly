export const DELHI_MARKETS = [
  {
    area: "Chandni Chowk",
    locations: ["Kinari Bazaar", "Nai Sarak", "Dariba Kalan", "Katra Neel"],
  },
  {
    area: "Gandhi Nagar",
    locations: ["Gandhi Nagar Market", "Geeta Colony"],
  },
  {
    area: "Lajpat Nagar",
    locations: ["Central Market", "Export Market"],
  },
  {
    area: "Karol Bagh",
    locations: ["Tank Road", "Gaffar Market"],
  },
];

export const MILESTONES = [
  {
    id: 1,
    title: "First Steps",
    description: "Record your first meeting",
    threshold: 1,
  },
  {
    id: 2,
    title: "Getting Started",
    description: "Save 10 designs",
    threshold: 10,
  },
  {
    id: 3,
    title: "Building Network",
    description: "Meet 5 different vendors",
    threshold: 5,
  },
  {
    id: 4,
    title: "Fashion Explorer",
    description: "Collect designs from 3 different markets",
    threshold: 3,
  },
  {
    id: 5,
    title: "Design Curator",
    description: "Shortlist 20 designs",
    threshold: 20,
  },
];

export const MOTIVATIONAL_QUOTES = [
  "Every successful business started exactly where you are now! 🌱",
  "Small steps lead to big achievements! 🎯",
  "You're building something amazing! ✨",
  "Your fashion dreams are valid! 💫",
  "One meeting at a time, you're getting closer to your goals! 🎊",
];

export const DESIGN_CATEGORIES = [
  "Lehenga",
  "Saree",
  "Suit",
  "Kurti",
  "Gown",
  "Other",
] as const;

export type DesignCategory = (typeof DESIGN_CATEGORIES)[number];
