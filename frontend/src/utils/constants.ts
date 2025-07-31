export const AI_MODELS = [
	{
		value: "gpt-4o-mini",
		label: "GPT-4o Mini (Recommended)",
		description: "Fast and economical, perfect for resumes",
	},
	{
		value: "gpt-4",
		label: "GPT-4",
		description: "Best quality, slower",
	},
	{
		value: "gpt-4-turbo",
		label: "GPT-4 Turbo",
		description: "Fast and high quality",
	},
	{
		value: "gpt-3.5-turbo",
		label: "GPT-3.5 Turbo",
		description: "Basic model, fastest",
	},
] as const;

export const TEMPERATURE_OPTIONS = [
	{
		value: 0.1,
		label: "Conservative",
		description: "More focused and deterministic",
	},
	{
		value: 0.5,
		label: "Balanced",
		description: "Good balance of creativity and focus",
	},
	{
		value: 0.7,
		label: "Creative (Default)",
		description: "More creative and varied",
	},
	{
		value: 0.9,
		label: "Very Creative",
		description: "Highly creative and diverse",
	},
] as const;

export const FORM_VALIDATION = {
	PERSONAL_INFO: {
		FULL_NAME: {
			MIN_LENGTH: 2,
			MAX_LENGTH: 100,
			PATTERN: /^[a-zA-Z\s'-]+$/,
		},
		EMAIL: {
			PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		},
		PHONE: {
			PATTERN: /^[\+]?[\d\s\-\(\)]+$/,
		},
	},
	EDUCATION: {
		INSTITUTION: {
			MIN_LENGTH: 2,
			MAX_LENGTH: 100,
		},
		DEGREE: {
			MIN_LENGTH: 2,
			MAX_LENGTH: 100,
		},
		FIELD_OF_STUDY: {
			MIN_LENGTH: 2,
			MAX_LENGTH: 100,
		},
	},
	EXPERIENCE: {
		COMPANY: {
			MIN_LENGTH: 2,
			MAX_LENGTH: 100,
		},
		POSITION: {
			MIN_LENGTH: 2,
			MAX_LENGTH: 100,
		},
		DESCRIPTION: {
			MIN_LENGTH: 10,
			MAX_LENGTH: 1000,
		},
	},
	SKILLS: {
		MIN_SKILLS: 1,
		MAX_SKILLS: 50,
		SKILL_MAX_LENGTH: 50,
	},
	AI_PROMPT: {
		MIN_LENGTH: 10,
		MAX_LENGTH: 1000,
	},
} as const;

export const UI_MESSAGES = {
	LOADING: {
		GENERATING_RESUME: "Generating your resume...",
		LOADING_TEMPLATES: "Loading templates...",
		GENERATING_PDF: "Creating PDF...",
		LOADING_CONTENT: "Loading content...",
	},
	SUCCESS: {
		RESUME_GENERATED: "Resume generated successfully!",
		PDF_DOWNLOADED: "PDF downloaded successfully!",
		DATA_SAVED: "Data saved successfully!",
	},
	ERROR: {
		GENERATION_FAILED: "Failed to generate resume. Please try again.",
		TEMPLATE_LOAD_FAILED:
			"Failed to load templates. Please refresh the page.",
		PDF_GENERATION_FAILED: "Failed to generate PDF. Please try again.",
		VALIDATION_FAILED: "Please fill in all required fields.",
		NETWORK_ERROR: "Network error. Please check your connection.",
		UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
	},
	VALIDATION: {
		REQUIRED_FIELD: "This field is required",
		INVALID_EMAIL: "Please enter a valid email address",
		INVALID_PHONE: "Please enter a valid phone number",
		NAME_TOO_SHORT: "Name must be at least 2 characters",
		NAME_TOO_LONG: "Name must be less than 100 characters",
		DESCRIPTION_TOO_SHORT: "Description must be at least 10 characters",
		DESCRIPTION_TOO_LONG: "Description must be less than 1000 characters",
		PROMPT_TOO_SHORT: "Prompt must be at least 10 characters",
		PROMPT_TOO_LONG: "Prompt must be less than 1000 characters",
		MIN_SKILLS_REQUIRED: "Please add at least one skill",
		TOO_MANY_SKILLS: "Maximum 50 skills allowed",
	},
} as const;

export const ROUTES = {
	HOME: "/",
	EDIT: "/edit",
} as const;

export const LOCAL_STORAGE_KEYS = {
	FORM_DATA: "resume_form_data",
	AI_SETTINGS: "resume_ai_settings",
	SELECTED_TEMPLATE: "resume_selected_template",
} as const;

export const DEFAULT_VALUES = {
	AI_MODEL: "gpt-4" as const,
	TEMPERATURE: 0.7,
	TEMPLATE: "professional" as const,
} as const;
