import { useState } from "react";
import Field from "../shared/components/Field";
import genPassword from "./utils/gen";
import Button from "../shared/components/Button";
import { Title } from "../shared/components/Title";
import Back from "../shared/components/Back";

export default function Pgenerator() {
    const [symbolCount, setSymbolCount] = useState<number>(4);
    const [lettersCount, setLettersCount] = useState<number>(7);
    const [numbersCount, setNumbersCount] = useState<number>(3);
    const [specialWord, setSpecialWord] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);

    const [password, setPassword] = useState<string>('');

    const generatePassword = () => {
        setLoading(true);
        genPassword(symbolCount, lettersCount, numbersCount, specialWord)
            .then((password) => {
                setPassword(password);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }

    return (
        <>
            <Back />
            <Title label="Password generator" />
            <Field 
                label="Symbol count:" 
                value={symbolCount.toString()} 
                onChange={(value) => setSymbolCount(parseInt(value))} 
            />

            <Field 
                label="Letters count:" 
                value={lettersCount.toString()} 
                onChange={(value) => setLettersCount(parseInt(value))} 
            />

            <Field 
                label="Numbers count:" 
                value={numbersCount.toString()} 
                onChange={(value) => setNumbersCount(parseInt(value))} 
            />
            <Field
                label="Special word:"
                value={specialWord}
                onChange={setSpecialWord}
            />
            <Button 
                onClick={() => generatePassword()} 
                label="Generate password"
            />
            {loading && <p>Loading...</p>}
            <p>{password}</p>
        </>
    )
}