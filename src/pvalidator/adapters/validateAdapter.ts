import { validatePassword as vp } from "../../shared/utils/validate";

export default function validatePassword(
	password: string,
	setWeak: (value: string) => void,
	setChecked: (value: boolean) => void,
	setReasons: (value: string[]) => void
) {
	const [weak, checked, reasons] = vp(password, 60);
	setWeak(weak as string);
	setChecked(checked as boolean);
	setReasons(reasons as string[]);
}
