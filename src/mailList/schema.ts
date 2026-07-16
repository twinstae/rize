import * as v from 'valibot';

export const rawMailSchema = v.object({
	id: v.pipe(v.string(), v.minLength(1)),
	member: v.pipe(v.string(), v.minLength(1)),
	subject: v.pipe(v.string(), v.minLength(1)),
	preview: v.string(),
	time: v.pipe(v.string(), v.minLength(1)),
});
