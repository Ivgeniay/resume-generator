export interface GenerateResumeRequestDto {
	prompt: string;
	model: string;
	temperature: number;
	personalInfo: PersonalInfoDto;
	education: EducationDto[];
	experience: ExperienceDto[];
	skills: string[];
	lockedFields: LockedFieldsDto;
}

export interface PersonalInfoDto {
	fullName: string;
	position: string;
	email: string;
	phone: string;
	location: string;
}

export interface EducationDto {
	institution: string;
	degree: string;
	fieldOfStudy: string;
	startDate: string;
	endDate: string;
	description?: string;
}

export interface ExperienceDto {
	company: string;
	position: string;
	startDate: string;
	endDate: string;
	description: string;
}

export interface LockedFieldsDto {
	personalInfo: boolean;
	education: boolean;
	experience: boolean;
	skills: boolean;
}

export interface GenerateResumeResponseDto {
	personalInfo: PersonalInfoDto;
	education: EducationDto[];
	experience: ExperienceDto[];
	skills: string[];
}
