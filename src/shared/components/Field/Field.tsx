import { UseFormRegisterReturn } from "react-hook-form";
import "./style.css";

interface Props {
	label: string;
	register: UseFormRegisterReturn;
	error?: string;
	type?: string;
	select?: boolean;
	options?: string[];
}

export const Field = ({
	label,
	register,
	error,
	type = "text",
	select,
	options,
}: Props) => {
	return select ? (
		<div className="formgroup">
			<label>{label}</label>
			<select {...register}>
				{options?.map((option, i) => (
					<option key={i} value={option}>
						{option}
					</option>
				))}
			</select>

			{error && <span className="error">{error}</span>}
		</div>
	) : (
		<div className="formgroup">
			<label>{label}</label>

			<input
				type={type}
				{...register}
				autoCapitalize="off"
				autoCorrect="off"
			/>

			{error && <span className="error">{error}</span>}
		</div>
	);
};
