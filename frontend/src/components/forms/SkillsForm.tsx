import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

interface SkillsFormProps {
	data: string[];
	isLocked: boolean;
	onUpdate: (data: string[]) => void;
	onToggleLock: (isLocked: boolean) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({
	data,
	isLocked,
	onUpdate,
	onToggleLock,
}) => {
	const [newSkill, setNewSkill] = useState("");

	const addSkill = () => {
		if (newSkill.trim() && !data.includes(newSkill.trim())) {
			onUpdate([...data, newSkill.trim()]);
			setNewSkill("");
		}
	};

	const removeSkill = (skillToRemove: string) => {
		onUpdate(data.filter((skill) => skill !== skillToRemove));
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			addSkill();
		}
	};

	const predefinedSkills = [
		"JavaScript",
		"TypeScript",
		"React",
		"Node.js",
		"Python",
		"Java",
		"C++",
		"HTML/CSS",
		"Vue.js",
		"Angular",
		"Express.js",
		"MongoDB",
		"PostgreSQL",
		"Git",
		"Docker",
		"AWS",
		"Azure",
		"Kubernetes",
		"Jenkins",
		"Agile/Scrum",
		"Leadership",
		"Communication",
		"Problem Solving",
		"Team Management",
	];

	const availablePredefined = predefinedSkills.filter(
		(skill) => !data.includes(skill)
	);

	return (
		<div className="bg-white p-6 rounded-lg border border-gray-200">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-medium text-gray-900">Skills</h3>
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

			<div className="space-y-4">
				<div className="flex space-x-2">
					<Input
						value={newSkill}
						onChange={(e) => setNewSkill(e.target.value)}
						onKeyPress={handleKeyPress}
						placeholder="Add a skill..."
						className="flex-1"
					/>
					<Button onClick={addSkill} disabled={!newSkill.trim()}>
						Add
					</Button>
				</div>

				{data.length > 0 && (
					<div>
						<h4 className="text-sm font-medium text-gray-700 mb-2">
							Your Skills
						</h4>
						<div className="flex flex-wrap gap-2">
							{data.map((skill, index) => (
								<span
									key={index}
									className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
								>
									{skill}
									<button
										onClick={() => removeSkill(skill)}
										className="ml-2 text-blue-600 hover:text-blue-800"
									>
										<svg
											className="w-4 h-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</span>
							))}
						</div>
					</div>
				)}

				{availablePredefined.length > 0 && (
					<div>
						<h4 className="text-sm font-medium text-gray-700 mb-2">
							Quick Add
						</h4>
						<div className="flex flex-wrap gap-2">
							{availablePredefined.slice(0, 12).map((skill) => (
								<button
									key={skill}
									onClick={() => onUpdate([...data, skill])}
									className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
								>
									<svg
										className="w-3 h-3 mr-1"
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
									{skill}
								</button>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
