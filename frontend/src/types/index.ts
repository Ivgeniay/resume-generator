export * from "commonLib";

import type {
	PersonalInfoDto,
	EducationDto,
	ExperienceDto,
	GenerateResumeResponseDto,
} from "commonLib";

export interface ResumeFormData {
	personalInfo: PersonalInfoDto;
	education: EducationDto[];
	experience: ExperienceDto[];
	skills: string[];
}

export interface TemplateInfo {
	name: string;
	displayName: string;
	preview?: string;
}

export interface AppState {
	formData: ResumeFormData | null;
	selectedTemplate: string | null;
	generatedData: GenerateResumeResponseDto | null;
	isLoading: boolean;
}

export interface FormFieldLock {
	personalInfo: boolean;
	education: boolean;
	experience: boolean;
	skills: boolean;
}

export interface AISettings {
	model: string;
	temperature: number;
	prompt: string;
}
