import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import genPassword from "./utils/gen";
import { useState } from "react";
import {
	Back,
	Field,
} from "../shared/components";

const passwordParamsSchema = z.object({
	symbolCount: z.number().int().min(1).max(20),
	lettersCount: z.number().int().min(1).max(50),
	numbersCount: z.number().int().min(1).max(20),
	specialWord: z.string().max(30),
	threshold: z.number().int().min(0).max(100).default(60).optional(),
});

type PasswordParams = z.infer<typeof passwordParamsSchema>;

export default function Pgenerator() {
	const [password, setPassword] = useState<string>("");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PasswordParams>({
		resolver: zodResolver(passwordParamsSchema),
		defaultValues: {
			symbolCount: 4,
			lettersCount: 7,
			numbersCount: 3,
			specialWord: "",
			threshold: 80,
		},
	});

	const onSubmit = async (data: PasswordParams) => {
		try {
			const password = await genPassword(
				data.symbolCount,
				data.lettersCount,
				data.numbersCount,
				data.specialWord,
				data.threshold
			);
			setPassword(password);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Back />
			<h1>Password Generator</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Field
					label="Symbol count:"
					register={register("symbolCount", { valueAsNumber: true })}
					error={errors.symbolCount?.message}
				/>

				<Field
					label="Letters count:"
					register={register("lettersCount", { valueAsNumber: true })}
					error={errors.lettersCount?.message}
				/>

				<Field
					label="Numbers count:"
					register={register("numbersCount", { valueAsNumber: true })}
					error={errors.numbersCount?.message}
				/>

				<Field
					label="Special word:"
					register={register("specialWord")}
					error={errors.specialWord?.message}
				/>

				<Field
					label="Threshold:"
					register={register("threshold", { valueAsNumber: true })}
					error={errors.threshold?.message}
				/>

				<button type="submit">Check password</button>

				{password && (
					<p>
						<strong>Generated Password:</strong> {password}
					</p>
				)}
			</form>
		</>
	);
}
