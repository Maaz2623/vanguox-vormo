import { Building, CreditCard, Home, Search } from "lucide-react";

// Menu items.
export const sidebarGeneralItems = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
];

export const sidebarPrivateItems = [
  {
    title: "Organizations",
    url: "/dashboard/organizations",
    icon: Building,
  },
  {
    title: "Subscriptions",
    url: "/dashboard/subscriptions",
    icon: CreditCard,
  },
];


export const ORGANIZATION_FETCH_LIMIT = 5
