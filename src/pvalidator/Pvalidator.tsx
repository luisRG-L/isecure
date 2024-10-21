import { useState } from "react";
import Field from "../shared/components/Field";
import Button from "../shared/components/Button";
import validatePassword from "./adapter/validateAdapter";
import { Title } from "../shared/components/Title";
import Back from "../shared/components/Back";

export default function Pvalidator() {
    const [password, setPassword] = useState<string>('');
    const [weak, setWeak] = useState<string>('');
    const [checked, setChecked] = useState<boolean>(false);    

    return (
        <>
            <Back />
            <Title label="Password validator" />
            <Field value={password} placeholder="Insert your password" onChange={setPassword} />
            <Button label="Validate" onClick={() => validatePassword(password, setWeak, setChecked)} />
            {weak && <p><strong>Weak password:</strong> {weak}❌</p>}
            {checked && <p><strong>Password is checked ✅</strong></p>}
        </>
    )
}