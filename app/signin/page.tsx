'use client'
import React from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useRouter } from 'next/navigation'
import { auth } from '@/firebase/config';

function Page() {
    const [phone, setPhone] = React.useState('' as string)
    const [code, setCode] = React.useState('' as string)
    const [conf, setConf] = React.useState(null as any)
    const router = useRouter()

    React.useEffect(() => {
        // init captcha object
        window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            'captchaContainer',
            {
                size: 'invisible',
                callback: () => {
                    // ...
                }
            }
        );
    }, []);


    const handleForm = async (event: any) => {
        event.preventDefault()

        conf.confirm(code).then((result) => {
            // User signed in successfully.
            const user = result.user;
            // ...
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            return console.log(error)
        });
        return router.push("/admin")
    }

    const handlePhone = async () => {
        const appVerifier = window.recaptchaVerifier;
        console.log({ auth, phone, appVerifier });
        return signInWithPhoneNumber(auth, phone, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                console.log({ confirmationResult });
                setConf(confirmationResult);
                // ...
            }).catch((error) => {
            // Error; SMS not sent
                console.log({ error });
                // ...
        });

    }

    return (
        <div className="dos-container">
            <div id="captchaContainer"></div>
            <h1>SMS Login</h1>
            <div>
                <label className="dos-prompt">Enter your phone number:</label>
                <input
                    className="dos-input"
                    type="tel"
                    placeholder="..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <button className="dos-button" onClick={handlePhone}>
                    Submit
                </button>
                <span className="cursor"></span>
            </div>
            {phone && (
                <div>
                    <label className="dos-prompt">Enter OTP:</label>
                    <input
                        className="dos-input"
                        type="text"
                        placeholder="Enter OTP"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <button className="dos-button" onClick={handleForm}>
                        Verify OTP
                    </button>
                    <span className="cursor"></span>
                </div>
            )}
        </div>
    );
}

export default Page;