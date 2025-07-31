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
Ты профессиональный составитель резюме. На основе промта пользователя и существующих данных резюме улучши и дополни только незаблокированные поля. Заблокированные поля оставь точно такими, какими они были предоставлены.

ВАЖНО: Отвечай на том же языке, что и промт пользователя. Если пользователь пишет по-русски, отвечай по-русски. Если по-украински, то по-украински. Если по-английски, то по-английски.

User Prompt: ${request.prompt}

Current Resume Data:
personalInfo: ${JSON.stringify(request.context.personalInfo)}
education: ${JSON.stringify(request.context.education)}
experience: ${JSON.stringify(request.context.experience)}
skills: ${JSON.stringify(request.context.skills)}

Locked Fields (НЕ ИЗМЕНЯТЬ):
- personalInfo: ${request.lockedFields.personalInfo}
- education: ${request.lockedFields.education}
- experience: ${request.lockedFields.experience}
- skills: ${request.lockedFields.skills}

Инструкции:
1. Изменяй только поля, которые НЕ заблокированы
2. Улучшай и дополняй контент на основе промта пользователя
3. Сохраняй ту же структуру и формат
4. Делай контент профессиональным и привлекательным
5. Возвращай ТОЛЬКО валидный JSON в точно такой же структуре
    `;

		const result = await structuredLlm.invoke(prompt);
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
