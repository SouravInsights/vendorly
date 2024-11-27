import { type Meeting, type Design } from "@/db/schema";
import { DesignCategory } from "./constants";

// Database Types
export interface MeetingWithDesigns extends Meeting {
  designs: Design[];
}

// Form Types
export interface DesignInput {
  file: File;
  basePrice?: number;
  finalPrice?: number;
  similarMinPrice?: number;
  similarMaxPrice?: number;
  notes?: string;
  category?: DesignCategory;
}

export interface MeetingFormData {
  vendorName: string;
  location: string;
  phoneNumber: string;
  notes: string;
}

export interface MeetingInput {
  vendorName: string;
  location: string;
  phoneNumber?: string;
  notes?: string;
  designs: DesignInput[];
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}

// Specific API Response Types

export interface MeetingResponse {
  id: number;
  vendorName: string;
  location: string;
  phoneNumber?: string;
  notes?: string;
  designs: Design[];
}

export interface UploadResponse {
  url: string;
  success: boolean;
  error?: string;
}

// API Error Response
export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, string[]>;
}
