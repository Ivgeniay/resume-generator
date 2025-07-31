import React from "react";
import type { PersonalInfoDto } from "../../types";
import { Input } from "../ui/Input";

interface PersonalInfoFormProps {
	data: PersonalInfoDto;
	isLocked: boolean;
	onUpdate: (data: PersonalInfoDto) => void;
	onToggleLock: (isLocked: boolean) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
	data,
	isLocked,
	onUpdate,
	onToggleLock,
}) => {
	const handleChange = (field: keyof PersonalInfoDto, value: string) => {
		onUpdate({ ...data, [field]: value });
	};

	return (
		<div className="bg-white p-6 rounded-lg border border-gray-200">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-medium text-gray-900">
					Personal Information
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

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Input
					label="Full Name"
					value={data.fullName}
					onChange={(e) => handleChange("fullName", e.target.value)}
					placeholder="John Doe"
				/>

				<Input
					label="Position"
					value={data.position}
					onChange={(e) => handleChange("position", e.target.value)}
					placeholder="Software Engineer"
				/>

				<Input
					label="Email"
					type="email"
					value={data.email}
					onChange={(e) => handleChange("email", e.target.value)}
					placeholder="john.doe@example.com"
				/>

				<Input
					label="Phone"
					value={data.phone}
					onChange={(e) => handleChange("phone", e.target.value)}
					placeholder="+1 (555) 123-4567"
				/>

				<div className="md:col-span-2">
					<Input
						label="Location"
						value={data.location}
						onChange={(e) =>
							handleChange("location", e.target.value)
						}
						placeholder="New York, NY"
					/>
				</div>
			</div>
		</div>
	);
};
