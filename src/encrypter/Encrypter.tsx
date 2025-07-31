import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { decrypt, decryptAES, encrypt, encryptAES } from "./utils/simple";
import { encryptWithPassword, decryptWithPassword } from "./utils/encrypt";
import { Back, Field } from "../shared/components";
import { useState } from "react";

const encrypterSchema = z.object({
	text: z.string().min(1, "Text is required"),
	key: z
		.string()
		.min(1, "Key is required")
		.regex(/^[\x20-\x7E]+$/, "Key must be printable ASCII"),

	mode: z.enum(["encrypt", "decrypt"]),
	algorithm: z
		.enum(["simple", "double", "AES", "complete"])
		.default("simple")
		.optional(),
});

type EncrypterForm = z.infer<typeof encrypterSchema>;

export default function Encrypter() {
	const [encrypted, setEncrypted] = useState<string>("");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<EncrypterForm>({
		resolver: zodResolver(encrypterSchema),
		defaultValues: {
			text: "Test",
			key: "Key",
			mode: "encrypt",
		},
	});

	const onSubmit = async (data: EncrypterForm) => {
		try {
			let result = "";
			if (data.algorithm === "simple") {
				if (data.mode === "encrypt") {
					result = await encrypt(data.text, data.key);
				} else {
					result = await decrypt(data.text, data.key);
				}
			} else if (data.algorithm === "AES") {
				if (data.mode === "encrypt") {
					result = await encryptWithPassword(data.text, data.key);
				} else {
					result = await decryptWithPassword(data.text, data.key);
				}
			} else if (data.algorithm === "complete") {
				if (data.mode === "encrypt") {
					result = await encryptAES(data.text, data.key);
				} else {
					result = await decryptAES(data.text, data.key);
				}
			} else if (data.algorithm === "double") {
				if (data.mode === "encrypt") {
					result = await encrypt(data.text, data.key);
					result = await encrypt(result, data.key);
				} else {
					result = await decrypt(data.text, data.key);
					result = await decrypt(result, data.key);
				}
			}
			setEncrypted(result);
		} catch (error) {
			console.error(error);
			setEncrypted(
				"Error: " +
					(error instanceof Error ? error.message : String(error))
			);
		}
	};

	return (
		<>
			<Back />
			<h1>Encrypter</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Field
					label="Text:"
					register={register("text")}
					error={errors.text?.message}
				/>
				<Field
					label="Key:"
					register={register("key")}
					error={errors.key?.message}
				/>
				<Field
					label="Mode:"
					register={register("mode")}
					error={errors.mode?.message}
					select
					options={["encrypt", "decrypt"]}
				/>
				<Field
					label="Algorithm:"
					register={register("algorithm")}
					error={errors.algorithm?.message}
					select
					options={["simple", "double", "AES", "complete"]}
				/>
				<button type="submit">Encrypt/Decrypt</button>
				{encrypted && (
					<p>
						<strong>Result:</strong> {encrypted}
					</p>
				)}
			</form>
		</>
	);
}
