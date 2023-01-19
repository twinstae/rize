import { z } from 'zod';
export const rawMailSchema = z.object({
	id: z.string().min(1),
	member: z.string().min(1),
	subject: z.string().min(1),
	preview: z.string(),
	time: z.string().min(1),
});
