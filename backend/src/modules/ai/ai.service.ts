import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ChatOpenAI } from "@langchain/openai";
import {
	AIProcessRequestDto,
	AIProcessResponseDto,
	PersonalInfo,
} from "commonLib";
import { ResumeSchema } from "./types";
import { zodToJsonSchema } from "zod-to-json-schema";

@Injectable()
export class AIService {
	constructor(private configService: ConfigService) {}

	async processResumeData(
		request: AIProcessRequestDto
	): Promise<AIProcessResponseDto> {
		const llm = new ChatOpenAI({
			apiKey: this.configService.get<string>("OPENAI_API_KEY"),
			modelName: request.model,
			temperature: request.temperature,
		});
		const jsonSchema = zodToJsonSchema(ResumeSchema);
		const structuredLlm = llm.withStructuredOutput(jsonSchema);

		const prompt = `
Заполни резюме для Frontend разработчика на основе запроса пользователя.
ВАЖНО: Отвечай на том же языке, что и промт пользователя. Если пользователь пишет по-русски, отвечай по-русски. Если по-украински, то по-украински. Если по-английски, то по-английски.

User Prompt: ${request.prompt}

Текущие данные:
${JSON.stringify(request.context, null, 2)}

Заблокированные поля (НЕ ИЗМЕНЯТЬ): ${JSON.stringify(request.lockedFields)}

ОБЯЗАТЕЛЬНО верни полную структуру со всеми полями, включая массивы skills и education.
Улучшай и дополняй контент на основе промта пользователя
`;

		const result = await structuredLlm.invoke(prompt);

		// console.log(
		// 	"Generated JSON Schema:",
		// 	JSON.stringify(jsonSchema, null, 2)
		// );
		// console.log(prompt);
		// console.log(result);

		return this.mergeLockdFields(result, request);
	}

	private mergeLockdFields(
		aiResult: any,
		request: AIProcessRequestDto
	): AIProcessResponseDto {
		return {
			personalInfo: request.lockedFields.personalInfo
				? request.context.personalInfo
				: aiResult.personalInfo,
			education: request.lockedFields.education
				? request.context.education
				: aiResult.education,
			experience: request.lockedFields.experience
				? request.context.experience
				: aiResult.experience,
			skills: request.lockedFields.skills
				? request.context.skills
				: aiResult.skills,
		};
	}
}
