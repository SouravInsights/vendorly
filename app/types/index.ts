import { LucideIcon } from "lucide-react";

export interface Vendor {
  id: string;
  name: string;
  location: string;
  rating: number;
  contactPerson?: string;
  phone?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  costPrice: number;
  sellingPrice: number;
  vendorId: string;
}

export interface StatCard {
  title: string;
  value: string;
  trend: string;
  icon: LucideIcon;
}
