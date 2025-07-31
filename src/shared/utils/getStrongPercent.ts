import {
	RAW_NUMBERS,
	RAW_SPECIAL_CHARS,
	MIN_PASSWORD_LENGTH,
} from "../consts";

const escCC = (s: string) => s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");

const RE_UPPER = /[A-Z]/;
const RE_LOWER = /[a-z]/;
const RE_NUMBER = new RegExp(`[${escCC(RAW_NUMBERS)}]`);
const RE_SPECIAL = new RegExp(`[${escCC(RAW_SPECIAL_CHARS)}]`);
const RE_STARTS_NUM_OR_SYM = new RegExp(
	`^[${escCC(RAW_NUMBERS + RAW_SPECIAL_CHARS)}]`
);
const RE_TRIPLE_REPEAT = /(.)\1{2,}/g;
const RE_COMMON = /(password|qwerty|abc123|123456|admin|letmein|welcome)/i;

export function getStrongPercent(password: string): number {
	if (!password) return 0;

	const len = password.length;
	const hasUpper = RE_UPPER.test(password);
	const hasLower = RE_LOWER.test(password);
	const hasNum = RE_NUMBER.test(password);
	const hasSpec = RE_SPECIAL.test(password);
	const startsNumOrSym = RE_STARTS_NUM_OR_SYM.test(password);
	const hasSpace = password.includes(" ");

	const repeatsCount = password.match(RE_TRIPLE_REPEAT)?.length ?? 0;
	const uniqueCount = new Set(password).size;
	const diversityRatio = uniqueCount / len;

	const isPerfect =
		len >= 16 &&
		hasUpper &&
		hasLower &&
		hasNum &&
		hasSpec &&
		!hasSpace &&
		!startsNumOrSym &&
		repeatsCount === 0 &&
		!RE_COMMON.test(password) &&
		diversityRatio >= 0.7;

	if (isPerfect) return 100;

	let lengthScore = 0;
	if (len < MIN_PASSWORD_LENGTH) {
		lengthScore = Math.min(1, len / Math.max(1, MIN_PASSWORD_LENGTH)) * 20;
	} else {
		const target = 20;
		const span = Math.max(1, target - MIN_PASSWORD_LENGTH);
		const ratio = Math.min(1, (len - MIN_PASSWORD_LENGTH) / span);
		lengthScore = 20 + ratio * 20;
	}

	let classScore = 0;
	classScore += hasUpper ? 11.25 : 0;
	classScore += hasLower ? 11.25 : 0;
	classScore += hasNum ? 11.25 : 0;
	classScore += hasSpec ? 11.25 : 0;

	let penalty = 0;
	if (startsNumOrSym) penalty -= 5;
	if (hasSpace) penalty -= 10;
	if (repeatsCount > 0) penalty -= Math.min(6, repeatsCount * 3);
	if (RE_COMMON.test(password)) penalty -= 8;
	if (diversityRatio < 0.6) {
		penalty -= Math.round(((0.6 - diversityRatio) / 0.6) * 6);
	}
	penalty = Math.max(penalty, -15);

	let score = lengthScore + classScore + penalty;
	score = Math.max(0, Math.min(100, Math.round(score)));
	return score;
}

export function getStrengthLabel(
	percent: number
): "Weak" | "Medium" | "Strong" {
	if (percent >= 80) return "Strong";
	if (percent >= 50) return "Medium";
	return "Weak";
}
