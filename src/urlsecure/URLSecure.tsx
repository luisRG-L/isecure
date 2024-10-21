import { useState } from "react";
import Field from "../shared/components/Field";
import Button from "../shared/components/Button";
import verifyURLSecurity from "./adapter/URLSecure";

export default function URLSecure() {
    const [url, setUrl] = useState<string>('');
    const [security, setSecurity] = useState<number>(0);

    return (
        <>
            <Field
                label="URL:"
                value={url}
                onChange={setUrl}
            />
            <Button 
                onClick={() => setSecurity(verifyURLSecurity(url))} 
                label="Check URL security"
            />
            {security && <p><strong>Security:</strong>{security}%</p>}
        </>
    )
}