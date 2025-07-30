export interface AIProcessRequestDto {
	prompt: string;
	temperature: number;
	model: string;
	context: ResumeContextDto;
	lockedFields: LockedFieldsDto;
}

import {
	PersonalInfoDto,
	EducationDto,
	ExperienceDto,
	LockedFieldsDto,
} from "./resume.dto";

export interface ResumeContextDto {
	personalInfo: PersonalInfoDto;
	education: EducationDto[];
	experience: ExperienceDto[];
	skills: string[];
}

export interface AIProcessResponseDto {
	personalInfo: PersonalInfoDto;
	education: EducationDto[];
	experience: ExperienceDto[];
	skills: string[];
}
