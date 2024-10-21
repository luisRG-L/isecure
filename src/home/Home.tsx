import { Link } from "react-router-dom";
import { Title } from "../shared/components/Title";

export default function Home() {
    return (
        <>
            <Title label="Home" />
            <Link to='/pvalidator'>Password validator</Link>
            <Link to='/pgenerator'>Password generator</Link>
            { 
                //<Link to='/urlsecure'>URL security</Link> 
            }
        </>
    )
}