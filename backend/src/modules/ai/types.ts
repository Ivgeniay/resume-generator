import { z } from "zod";

export const PersonalInfoSchema = z.object({
	fullName: z.string().optional(),
	position: z.string().optional(),
	email: z.string().optional(),
	phone: z.string().optional(),
	location: z.string().optional(),
});

export const EducationSchema = z.object({
	institution: z.string().optional(),
	degree: z.string().optional(),
	fieldOfStudy: z.string().optional(),
	startDate: z.string().optional(),
	endDate: z.string().optional(),
	description: z.string().optional(),
});

export const ExperienceSchema = z.object({
	company: z.string().optional(),
	position: z.string().optional(),
	startDate: z.string().optional(),
	endDate: z.string().optional(),
	description: z.string().optional(),
});

export const ResumeSchema = z.object({
	personalInfo: PersonalInfoSchema,
	education: z.array(EducationSchema),
	experience: z.array(ExperienceSchema),
	skills: z.array(z.string()),
});

export type ResumeSchemaType = z.infer<typeof ResumeSchema>;
export type PersonalInfoSchemaType = z.infer<typeof PersonalInfoSchema>;
export type EducationSchemaType = z.infer<typeof EducationSchema>;
export type ExperienceSchemaType = z.infer<typeof ExperienceSchema>;
