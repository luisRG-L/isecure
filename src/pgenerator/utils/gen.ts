import validatePassword from "../../shared/utils/validate";
import getRandomEnumValue from "../../shared/utils/randenum";
import {
	RAW_LETTERS,
	RAW_NUMBERS,
	RAW_SPECIAL_CHARS,
} from "../../shared/consts/consts";

enum SpecialWordLocation {
    Start  = "START",
    Middle = "MIDDLE",
    End = "END"
}

export default async function genPassword (
    symbolCount: number,
    lettersCount: number,
    numbersCount: number,
	specialWord: string,
	threshold: number = 60
): Promise<string> {

    const symbols = RAW_SPECIAL_CHARS.split('');
    const letters = RAW_LETTERS.split('');
    const numbers = RAW_NUMBERS.split('');

    let password = '';

    for (let i = 0; i < lettersCount; i++) {
        password += letters[Math.floor(Math.random() * letters.length)];
    }

    for (let i = 0; i < symbolCount; i++) {
        password += symbols[Math.floor(Math.random() * symbols.length)];
    }

    for (let i = 0; i < numbersCount; i++) {
        password += numbers[Math.floor(Math.random() * numbers.length)];
    }

    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    const randomSpecialWord = getRandomEnumValue(SpecialWordLocation);
    console.log(randomSpecialWord)

    switch (randomSpecialWord) {
        case SpecialWordLocation.Start:
            password = specialWord + password;
            break;
        case SpecialWordLocation.Middle:
            const firstPart = password.slice(0, password.length / 2);
            const secondPart = password.slice(password.length / 2);
            password = firstPart + specialWord + secondPart;
            break;
        case SpecialWordLocation.End:
            password = password + specialWord;
            break;
    }

    const [_weak, checked] = validatePassword(password, threshold);

    if (!checked) {
        return genPassword(symbolCount, lettersCount, numbersCount, specialWord);
    }

    return password;
}
