import { useState } from "react";
import SignupForm from "../components/SignupForm";

function SignupPage() {
    
    const [success, setSuccess] = useState(false);

    const handleSuccess = () => {
        setSuccess(true);
    };



    return (
        <div>
            {success ? (
                <h2>You signed up successfully!</h2>
            ) :(
            <SignupForm onSuccess={handleSuccess} />
            )}
        </div>
);
}

export default SignupPage;