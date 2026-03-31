import z from "zod";

export const CreateCommentDTO = z.object({
  post_id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Post ID"),
  content: z.string().min(1, "Comment cannot be empty").max(1000),
  parent_id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
});

export type CreateCommentInput = z.infer<typeof CreateCommentDTO>;
