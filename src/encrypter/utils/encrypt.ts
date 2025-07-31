// crypto-utils.ts
const enc = new TextEncoder();
const dec = new TextDecoder();

export function toB64(u8: Uint8Array): string {
	let bin = "";
	for (let i = 0; i < u8.length; i++) bin += String.fromCharCode(u8[i]);
	return btoa(bin);
}
export function fromB64(b64: string): Uint8Array {
	const bin = atob(b64);
	const out = new Uint8Array(bin.length);
	for (let i = 0; i < out.length; i++) out[i] = bin.charCodeAt(i);
	return out;
}

async function deriveKeyFromPassword(password: string, salt: Uint8Array) {
	const baseKey = await crypto.subtle.importKey(
		"raw",
		enc.encode(password),
		{ name: "PBKDF2" },
		false,
		["deriveKey"]
	);
	return crypto.subtle.deriveKey(
		{ name: "PBKDF2", salt, iterations: 150_000, hash: "SHA-256" },
		baseKey,
		{ name: "AES-GCM", length: 256 },
		false,
		["encrypt", "decrypt"]
	);
}

export async function encryptWithPassword(
	plaintext: string,
	password: string
): Promise<string> {
	if (!password) throw new Error("La contraseña es obligatoria.");
	const salt = crypto.getRandomValues(new Uint8Array(16));
	const iv = crypto.getRandomValues(new Uint8Array(12));
	const key = await deriveKeyFromPassword(password, salt);

	const ciphertext = await crypto.subtle.encrypt(
		{ name: "AES-GCM", iv },
		key,
		enc.encode(plaintext)
	);
	const c = new Uint8Array(ciphertext);

	const combined = new Uint8Array(salt.length + iv.length + c.length);
	combined.set(salt, 0);
	combined.set(iv, salt.length);
	combined.set(c, salt.length + iv.length);

	return `v1:${toB64(combined)}`;
}

export async function decryptWithPassword(
	payload: string,
	password: string
): Promise<string> {
	if (!password) throw new Error("La contraseña es obligatoria.");
	if (!payload.startsWith("v1:"))
		throw new Error("Formato no soportado (falta prefijo v1).");

	const bytes = fromB64(payload.slice(3));
	const salt = bytes.slice(0, 16);
	const iv = bytes.slice(16, 28);
	const data = bytes.slice(28);

	const key = await deriveKeyFromPassword(password, salt);
	try {
		const plain = await crypto.subtle.decrypt(
			{ name: "AES-GCM", iv },
			key,
			data
		);
		return dec.decode(plain);
	} catch {
		throw new Error("Contraseña incorrecta o datos corruptos.");
	}
}
