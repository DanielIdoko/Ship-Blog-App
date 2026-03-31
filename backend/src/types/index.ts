import { Request } from "express";
import mongoose from "mongoose";

/**
 * Authenticated Request with user data
 */
export interface AuthenticatedRequest extends Request {
  userId?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
  // cookies: any;
  params: any;
  query: any;
  body: any;
}

/**
 * Standard API Response Format
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  statusCode: number;
}

/**
 * Pagination Details
 */
export interface PaginationDetails {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Paginated Response
 */
export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: PaginationDetails;
  statusCode: number;
}

/**
 * User Entity
 */
export interface IUser {
  id?: string;
  username?: string;
  email: string;
  password: string;
  bio?: string;
  interests?: [string]; 
  role?: "user" | "admin";
  avatar_url?: Blob | string;
  emailVerified?: boolean;
  emailVerificationToken?: string;
  posts_count?: number,
  posts?: [Post], 
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface Comment {
  id?: string;
  content?: string;
  user_id?: IUser;
  likes?: number;
  sub_comments_count?: number;
  sub_comments?: [Comment];
  createdAt?: Date;
  updatedAt?: Date;
}


type post_status = "draft" | "active" | "posted" | "archived";

export interface Post {
  id?: string;
  title: string;
  content: string;
  author?: IUser;
  niches?: [string];
  slug?: string;
  type?: 'post' | 'news' | 'talk',
  cover_image?: string,
  tags?: [string], 
  status: post_status;
  likes_count?: number,
  views?: number,
  is_published?: boolean,
  comments_count?: number,
  comments?: [Comment];
  shares_count?: number; 
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Dashboard Stats
 */
export interface DashboardStats {}

/**
 * Query Options for pagination/filtering
 */
export interface QueryOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filter?: Record<string, any>;
}
