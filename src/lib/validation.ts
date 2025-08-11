import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  universityId: z.number(),
  universityCard: z.string().nonempty("University Card is required"),
  password: z.string().min(8),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const bookSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters").max(100, "Title cannot exceed 100 characters"),
  description: z.string().trim().min(10, "Description must be at least 10 characters").max(1000, "Description cannot exceed 1000 characters"),
  author: z.string().trim().min(2, "Author name must be at least 2 characters").max(100, "Author name cannot exceed 100 characters"),
  genre: z.string().trim().min(2, "Genre must be at least 2 characters").max(50, "Genre cannot exceed 50 characters"),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
  totalCopies: z.number().int().positive("Total copies must be a positive number").lte(10000, "Total copies cannot exceed 10,000"),
  coverUrl: z.string().url("Cover URL must be a valid URL"),
  coverColor: z.string().trim().regex(/^#[0-9A-F]{6}$/i, "Cover color must be a valid hex color code"),
  videoUrl: z.string().url("Video URL must be a valid URL"),
  summary: z.string().trim().min(10, "Summary must be at least 10 characters"),
});

