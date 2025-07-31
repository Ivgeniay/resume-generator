import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/Button";

interface InlineEditorProps {
	value: string;
	onSave: (newValue: string) => void;
	onCancel: () => void;
	isMultiline?: boolean;
}

export const InlineEditor: React.FC<InlineEditorProps> = ({
	value,
	onSave,
	onCancel,
	isMultiline = false,
}) => {
	const [editValue, setEditValue] = useState(value);
	const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
			inputRef.current.select();
		}
	}, []);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onCancel();
			}
		};

		const handleEnter = (e: KeyboardEvent) => {
			if (e.key === "Enter" && !isMultiline && !e.shiftKey) {
				e.preventDefault();
				handleSave();
			}

			if (e.key === "Enter" && e.ctrlKey) {
				e.preventDefault();
				handleSave();
			}
		};

		document.addEventListener("keydown", handleEscape);
		document.addEventListener("keydown", handleEnter);

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.removeEventListener("keydown", handleEnter);
		};
	}, [editValue, isMultiline]);

	const handleSave = () => {
		onSave(editValue.trim());
	};

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onCancel();
		}
	};

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
			onClick={handleBackdropClick}
		>
			<div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
				<div className="p-6">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-medium text-gray-900">
							Edit Text
						</h3>
						<button
							onClick={onCancel}
							className="text-gray-400 hover:text-gray-600 transition-colors"
						>
							<svg
								className="w-6 h-6"
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
					</div>

					<div className="mb-6">
						{isMultiline ? (
							<textarea
								ref={
									inputRef as React.RefObject<HTMLTextAreaElement>
								}
								value={editValue}
								onChange={(e) => setEditValue(e.target.value)}
								className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
								placeholder="Enter your text..."
							/>
						) : (
							<input
								ref={
									inputRef as React.RefObject<HTMLInputElement>
								}
								type="text"
								value={editValue}
								onChange={(e) => setEditValue(e.target.value)}
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								placeholder="Enter your text..."
							/>
						)}

						<div className="mt-2 text-sm text-gray-500">
							{isMultiline ? (
								<span>
									Press Ctrl+Enter to save, Escape to cancel
								</span>
							) : (
								<span>
									Press Enter to save, Escape to cancel
								</span>
							)}
						</div>
					</div>

					<div className="flex justify-end space-x-3">
						<Button variant="outline" onClick={onCancel}>
							Cancel
						</Button>
						<Button
							onClick={handleSave}
							disabled={!editValue.trim()}
						>
							Save Changes
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
