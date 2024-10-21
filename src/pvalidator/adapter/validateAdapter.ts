import { validatePassword as vp } from "../../shared/utils/validate";

export default function validatePassword (password: string, setWeak: (value: string) => void , setChecked: (value: boolean) => void) {
    const [weak, checked] = vp(password);
    setWeak(weak as string);
    setChecked(checked as boolean);
};