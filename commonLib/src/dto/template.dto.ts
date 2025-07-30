export interface TemplateListResponseDto {
  templates: string[];
}

export interface TemplateContentResponseDto {
  name: string;
  html: string;
  css: string;
}

export interface TemplateContentRequestDto {
  name: string;
}