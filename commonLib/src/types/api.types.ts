import { PersonalInfoDto, EducationDto, ExperienceDto } from '../dto/resume.dto';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface GeneratePdfRequestDto {
  templateName: string;
  resumeData: ResumeDataDto;
}

export interface ResumeDataDto {
  personalInfo: PersonalInfoDto;
  education: EducationDto[];
  experience: ExperienceDto[];
  skills: string[];
}