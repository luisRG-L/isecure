import { useState } from "react";
import validatePassword from "./adapters/validateAdapter";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Back, Field } from "../shared/components";
import {
	getStrengthLabel,
	getStrongPercent,
} from "../shared/utils/getStrongPercent";

const schema = z.object({
	password: z.string().min(8, "Password must be at least 8 characters"),
});

type PasswordForm = z.infer<typeof schema>;

export default function Pvalidator() {
	const [weak, setWeak] = useState<string>("");
	const [checked, setChecked] = useState<boolean>(false);
	const [weakPercent, setWeakPercent] = useState<number>(0);
	const [reasons, setReasons] = useState<string[]>([]);

	const { register, handleSubmit, formState } = useForm<PasswordForm>({
		resolver: zodResolver(schema),
		defaultValues: {
			password: "",
		},
	});

	const onSubmit = async (data: PasswordForm) => {
		try {
			validatePassword(data.password, setWeak, setChecked, setReasons);
			setWeakPercent(getStrongPercent(data.password));
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Back />
			<h1>Password validator</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Field
					label="Password:"
					register={register("password")}
					error={formState.errors.password?.message}
					type="password"
				/>
				<button type="submit">Check password</button>
				{weak && (
					<p>
						<strong>Weak password:</strong> {weak}❌
					</p>
				)}
				{reasons && (
					<ul>
						{reasons.map((reason, i) => (
							<li key={i}>{reason}</li>
						))}
					</ul>
				)}

				{checked && (
					<p>
						<strong>Password is checked ✅</strong>
					</p>
				)}
				<p>
					Security: {weakPercent}%, {getStrengthLabel(weakPercent)}
				</p>
			</form>
		</>
	);
}
