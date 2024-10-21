export default function validatePassword(password: string) {
    let weak: string = '';
    let checked: boolean = false;
    const setChecked = (val: boolean) => checked = val;
    const setWeak = (val: string) => weak = val;

    setWeak('');
    setChecked(false);

    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Verifica si el primer carácter es un número o un símbolo
    const startsWithNumberOrSymbol = /^[0-9!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        setWeak('The password is too short');
    } else if (password.includes(' ')) {
        setWeak('Contains an invalid character (space)');
    } else if (!hasUpperCase) {
        setWeak('Must include at least one uppercase letter');
    } else if (!hasLowerCase) {
        setWeak('Must include at least one lowercase letter');
    } else if (!hasNumber) {
        setWeak('Must include at least one number');
    } else if (!hasSpecialChar) {
        setWeak('Must include at least one special character');
    } else if (startsWithNumberOrSymbol) {
        setWeak('Password cannot start with a number or symbol');
    } else {
        setWeak('');
        setChecked(true);
    }

    return [weak, checked];
}

export { validatePassword };
