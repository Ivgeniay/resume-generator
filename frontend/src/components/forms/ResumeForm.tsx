import React from "react";
import type { ResumeFormData, FormFieldLock, AISettings } from "../../types";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { EducationForm } from "./EducationForm";
import { ExperienceForm } from "./ExperienceForm";
import { SkillsForm } from "./SkillsForm";
import { AI_MODELS, TEMPERATURE_OPTIONS } from "../../utils/constants";

interface ResumeFormProps {
	formData: ResumeFormData;
	lockedFields: FormFieldLock;
	aiSettings: AISettings;
	onUpdateFormData: (data: Partial<ResumeFormData>) => void;
	onUpdateLockedFields: (fields: Partial<FormFieldLock>) => void;
	onUpdateAISettings: (settings: Partial<AISettings>) => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({
	formData,
	lockedFields,
	aiSettings,
	onUpdateFormData,
	onUpdateLockedFields,
	onUpdateAISettings,
}) => {
	return (
		<div className="space-y-8">
			<PersonalInfoForm
				data={formData.personalInfo}
				isLocked={lockedFields.personalInfo}
				onUpdate={(personalInfo) => onUpdateFormData({ personalInfo })}
				onToggleLock={(isLocked) =>
					onUpdateLockedFields({ personalInfo: isLocked })
				}
			/>

			<EducationForm
				data={formData.education}
				isLocked={lockedFields.education}
				onUpdate={(education) => onUpdateFormData({ education })}
				onToggleLock={(isLocked) =>
					onUpdateLockedFields({ education: isLocked })
				}
			/>

			<ExperienceForm
				data={formData.experience}
				isLocked={lockedFields.experience}
				onUpdate={(experience) => onUpdateFormData({ experience })}
				onToggleLock={(isLocked) =>
					onUpdateLockedFields({ experience: isLocked })
				}
			/>

			<SkillsForm
				data={formData.skills}
				isLocked={lockedFields.skills}
				onUpdate={(skills) => onUpdateFormData({ skills })}
				onToggleLock={(isLocked) =>
					onUpdateLockedFields({ skills: isLocked })
				}
			/>

			<div className="border-t pt-6">
				<h3 className="text-lg font-medium text-gray-900 mb-4">
					AI Settings
				</h3>

				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							AI Model
						</label>
						<select
							value={aiSettings.model}
							onChange={(e) =>
								onUpdateAISettings({ model: e.target.value })
							}
							className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						>
							{AI_MODELS.map((model) => (
								<option key={model.value} value={model.value}>
									{model.label}
								</option>
							))}
						</select>
						<p className="mt-1 text-sm text-gray-500">
							{
								AI_MODELS.find(
									(m) => m.value === aiSettings.model
								)?.description
							}
						</p>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Creativity Level: {aiSettings.temperature}
						</label>
						<input
							type="range"
							min="0.1"
							max="1"
							step="0.1"
							value={aiSettings.temperature}
							onChange={(e) =>
								onUpdateAISettings({
									temperature: parseFloat(e.target.value),
								})
							}
							className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
						/>
						<div className="flex justify-between text-xs text-gray-500 mt-1">
							<span>Conservative</span>
							<span>Balanced</span>
							<span>Creative</span>
						</div>
						<p className="mt-1 text-sm text-gray-500">
							{TEMPERATURE_OPTIONS.find(
								(t) =>
									Math.abs(t.value - aiSettings.temperature) <
									0.15
							)?.description || "Custom creativity level"}
						</p>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							AI Prompt *
						</label>
						<textarea
							value={aiSettings.prompt}
							onChange={(e) =>
								onUpdateAISettings({ prompt: e.target.value })
							}
							placeholder="Describe how you want to improve your resume. For example: 'Make it more professional for a software engineering role' or 'Add more impact and quantify achievements'"
							rows={4}
							className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
						<p className="mt-1 text-sm text-gray-500">
							Tell the AI how you want to enhance your resume. Be
							specific about the role, industry, or improvements
							you want.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
