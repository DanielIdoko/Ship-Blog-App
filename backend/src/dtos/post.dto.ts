import { z } from 'zod';

export const CreatePostDTO = z.object({
  title: z.string().min(5, "Title is too short").max(100),
  content: z.string().min(10, "Content must be substantial"),
  niches: z.array(z.string().min(1, "Niche is required")),
  type: z.enum(['post', 'news', 'talk']).default('post'),
  tags: z.array(z.string()).optional(),
  cover_image: z.string().url().optional(),
});

export const UpdatePostDTO = CreatePostDTO.partial();

export type CreatePostInput = z.infer<typeof CreatePostDTO>;