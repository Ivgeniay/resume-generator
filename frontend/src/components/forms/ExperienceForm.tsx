import React from "react";
import type { ExperienceDto } from "../../types";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

interface ExperienceFormProps {
	data: ExperienceDto[];
	isLocked: boolean;
	onUpdate: (data: ExperienceDto[]) => void;
	onToggleLock: (isLocked: boolean) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
	data,
	isLocked,
	onUpdate,
	onToggleLock,
}) => {
	const addExperience = () => {
		const newExperience: ExperienceDto = {
			company: "",
			position: "",
			startDate: "",
			endDate: "",
			description: "",
		};
		onUpdate([...data, newExperience]);
	};

	const removeExperience = (index: number) => {
		onUpdate(data.filter((_, i) => i !== index));
	};

	const updateExperience = (
		index: number,
		field: keyof ExperienceDto,
		value: string
	) => {
		const updated = data.map((item, i) =>
			i === index ? { ...item, [field]: value } : item
		);
		onUpdate(updated);
	};

	return (
		<div className="bg-white p-6 rounded-lg border border-gray-200">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-medium text-gray-900">
					Work Experience
				</h3>
				<label className="flex items-center space-x-2 cursor-pointer">
					<input
						type="checkbox"
						checked={isLocked}
						onChange={(e) => onToggleLock(e.target.checked)}
						className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
					/>
					<span className="text-sm text-gray-600">Lock data</span>
					<svg
						className="w-4 h-4 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d={
								isLocked
									? "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
									: "M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
							}
						/>
					</svg>
				</label>
			</div>

			<div className="space-y-6">
				{data.map((experience, index) => (
					<div
						key={index}
						className="border border-gray-200 rounded-lg p-4"
					>
						<div className="flex justify-between items-center mb-4">
							<h4 className="text-md font-medium text-gray-800">
								Experience #{index + 1}
							</h4>
							{data.length > 1 && (
								<Button
									variant="ghost"
									size="sm"
									onClick={() => removeExperience(index)}
									className="text-red-600 hover:text-red-700"
								>
									Remove
								</Button>
							)}
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Input
								label="Company"
								value={experience.company}
								onChange={(e) =>
									updateExperience(
										index,
										"company",
										e.target.value
									)
								}
								placeholder="Google Inc."
							/>

							<Input
								label="Position"
								value={experience.position}
								onChange={(e) =>
									updateExperience(
										index,
										"position",
										e.target.value
									)
								}
								placeholder="Senior Software Engineer"
							/>

							<div className="grid grid-cols-2 gap-2">
								<Input
									label="Start Date"
									value={experience.startDate}
									onChange={(e) =>
										updateExperience(
											index,
											"startDate",
											e.target.value
										)
									}
									placeholder="Jan 2020"
								/>
								<Input
									label="End Date"
									value={experience.endDate}
									onChange={(e) =>
										updateExperience(
											index,
											"endDate",
											e.target.value
										)
									}
									placeholder="Present"
								/>
							</div>

							<div className="md:col-span-2">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Description
								</label>
								<textarea
									value={experience.description}
									onChange={(e) =>
										updateExperience(
											index,
											"description",
											e.target.value
										)
									}
									placeholder="• Led a team of 5 developers to build scalable web applications&#10;• Improved system performance by 40% through optimization&#10;• Implemented CI/CD pipelines reducing deployment time by 60%"
									rows={4}
									className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								/>
								<p className="mt-1 text-sm text-gray-500">
									Use bullet points (•) to list your
									achievements and responsibilities
								</p>
							</div>
						</div>
					</div>
				))}

				<Button variant="outline" onClick={addExperience}>
					<svg
						className="w-4 h-4 mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 6v6m0 0v6m0-6h6m-6 0H6"
						/>
					</svg>
					Add Experience
				</Button>
			</div>
		</div>
	);
};
