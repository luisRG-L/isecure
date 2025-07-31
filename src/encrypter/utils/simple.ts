import { encryptWithPassword, decryptWithPassword } from "./encrypt";

const reverse = (str: string): string => {
	return str.split("").reverse().join("");
};

const encrypt = async (text: string, key: string): Promise<string> => {
	const newText = reverse(text);
	let result = "";

	for (let i = 0; i < newText.length; i++) {
		const textCharCode = newText.charCodeAt(i);
		const keyChar = key.charAt(i % key.length);
		const keyCharCode = reverse(keyChar.charCodeAt(0).toString());

		const encryptedCharCode = textCharCode + parseInt(keyCharCode);
		result += String.fromCharCode(encryptedCharCode);
	}

	return result;
};

const decrypt = async (encryptedText: string, key: string): Promise<string> => {
	let result = "";

	for (let i = 0; i < encryptedText.length; i++) {
		const encryptedCharCode = encryptedText.charCodeAt(i);
		const keyChar = key.charAt(i % key.length);
		const keyCharCode = reverse(keyChar.charCodeAt(0).toString());

		const originalCharCode = encryptedCharCode - parseInt(keyCharCode);
		result += String.fromCharCode(originalCharCode);
	}

	return reverse(result);
};

const encryptAES = async (text: string, key: string): Promise<string> => {
	let result = text;
	result = await encrypt(result, key);
	result = await encrypt(result, key);
	result = await encryptWithPassword(result, key);
	result = await encrypt(result, key);
	result = await encrypt(result, key);
	return result;
};

const decryptAES = async (
	encryptedText: string,
	key: string
): Promise<string> => {
	let result = encryptedText;
	result = await decrypt(result, key);
	result = await decrypt(result, key);
	result = await decryptWithPassword(result, key);
	result = await decrypt(result, key);
	result = await decrypt(result, key);
	return result;
};

export { encrypt, decrypt, encryptAES, decryptAES };
