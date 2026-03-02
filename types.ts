export interface Slide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  iconName: string; // Representing an icon key
}

export interface ThemeConfig {
  id: string;
  name: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  cardBackground: string;
  fontFamily: string;
}

export interface AppState {
  slides: Slide[];
  activeSlideIndex: number;
  logoUrl: string | null;
  theme: ThemeConfig;
  customCSS: string;
}

export const PRESET_THEMES: ThemeConfig[] = [
  {
    id: "modern-navy",
    name: "أزرق احترافي",
    backgroundColor: "#0f172a",
    textColor: "#ffffff",
    accentColor: "#38bdf8",
    cardBackground: "#1e293b",
    fontFamily: '"IBM Plex Sans Arabic", sans-serif',
  },
  {
    id: "clean-white",
    name: "أبيض نقي",
    backgroundColor: "#ffffff",
    textColor: "#1e293b",
    accentColor: "#0ea5e9",
    cardBackground: "#f8fafc",
    fontFamily: '"IBM Plex Sans Arabic", sans-serif',
  },
  {
    id: "luxury-gold",
    name: "فخامة ذهبية",
    backgroundColor: "#1c1917",
    textColor: "#fafaf9",
    accentColor: "#d4af37",
    cardBackground: "#292524",
    fontFamily: '"IBM Plex Sans Arabic", sans-serif',
  },
  {
    id: "brand-purple",
    name: "رادار بنفسجي",
    backgroundColor: "#4c1d95",
    textColor: "#ffffff",
    accentColor: "#c084fc",
    cardBackground: "#5b21b6",
    fontFamily: '"IBM Plex Sans Arabic", sans-serif',
  },
];

export const AVAILABLE_ICONS = [
  "Zap",
  "TrendingUp",
  "Shield",
  "Target",
  "Users",
  "DollarSign",
  "Briefcase",
  "Award",
  "Globe",
  "Smartphone",
];

export interface PresetLogo {
  id: string;
  name: string;
  url: string;
}

export const PRESET_LOGOS: PresetLogo[] = [
  { id: "logo1", name: "شعار 1", url: "/logos/logo1.png" },
  { id: "logo2", name: "شعار 2", url: "/logos/logo2.png" },
  { id: "logo3", name: "شعار 3", url: "/logos/logo3.png" },
  { id: "logo4", name: "شعار 4", url: "/logos/logo4.png" },
];
