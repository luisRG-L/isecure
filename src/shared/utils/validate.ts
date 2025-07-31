import {
	RAW_NUMBERS,
	RAW_SPECIAL_CHARS,
	MIN_PASSWORD_LENGTH,
	MAX_PASSWORD_LENGTH,
} from "../consts";

import { getStrongPercent } from "../utils/getStrongPercent";

const escapeForCharClass = (s: string) =>
	s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");

const RE_UPPER = /[A-Z]/;
const RE_LOWER = /[a-z]/;

const RE_NUMBER = new RegExp(`[${escapeForCharClass(RAW_NUMBERS)}]`);
const RE_SPECIAL = new RegExp(`[${escapeForCharClass(RAW_SPECIAL_CHARS)}]`);
const RE_STARTS_NUM_OR_SYM = new RegExp(
	`^[${escapeForCharClass(RAW_NUMBERS + RAW_SPECIAL_CHARS)}]`
);
const RE_TRIPLE_REPEAT = /(.)\1{2,}/g;
const RE_COMMON = /(password|qwerty|abc123|123456|admin|letmein|welcome)/i;

const STRONG_THRESHOLD = 60;

export default function validatePassword(
	password: string,
	threshold: number = STRONG_THRESHOLD
): [string, boolean, string[]] {
	let weak = "";
	let checked = false;

	if (password.length < MIN_PASSWORD_LENGTH) {
		weak = `The password is too short (min ${MIN_PASSWORD_LENGTH}).`;
		return [weak, checked, [weak]];
	}
	if (password.length > MAX_PASSWORD_LENGTH) {
		weak = `The password is too long (max ${MAX_PASSWORD_LENGTH}).`;
		return [weak, checked, [weak]];
	}
	if (password.includes(" ")) {
		weak = "Contains an invalid character (space).";
		return [weak, checked, [weak]];
	}

	// --- Señales de mejora (no bloquean solas) ---
	const reasons: string[] = [];

	const hasUpperCase = RE_UPPER.test(password);
	const hasLowerCase = RE_LOWER.test(password);
	const hasNumber = RE_NUMBER.test(password);
	const hasSpecialChar = RE_SPECIAL.test(password);
	const startsWithNumberOrSymbol = RE_STARTS_NUM_OR_SYM.test(password);

	if (!hasUpperCase) reasons.push("Add at least one uppercase letter");
	if (!hasLowerCase) reasons.push("Add at least one lowercase letter");
	if (!hasNumber) reasons.push("Add at least one number");
	if (!hasSpecialChar) reasons.push("Add at least one special character");

	if (startsWithNumberOrSymbol)
		reasons.push("Avoid starting with a number or symbol");

	const repeats = password.match(RE_TRIPLE_REPEAT)?.length ?? 0;
	if (repeats > 0) reasons.push("Avoid long repeated characters (e.g., aaa)");

	if (RE_COMMON.test(password)) reasons.push("Avoid common patterns/words");

	const uniqueCount = new Set(password).size;
	const diversityRatio = uniqueCount / password.length;
	if (diversityRatio < 0.6)
		reasons.push("Increase character variety (too many repeats)");

	const percent = getStrongPercent(password);

	if (percent >= threshold && reasons.length === 0) {
		weak = "";
		checked = true;
	} else {
		weak = `Strength: ${percent}%`;
		checked = false;
	}

	return [weak, checked, reasons];
}

export { validatePassword };
