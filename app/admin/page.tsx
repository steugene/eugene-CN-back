'use client'
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from '@/firebase/config';
import addData from '@/firebase/firestore/addData';
import getDocument from '@/firebase/firestore/getData';

function Page() {
    const { user } = useAuthContext()
    const router = useRouter()
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");

    React.useEffect(() => {
        if (auth.currentUser?.phoneNumber) {
            getDocument('users', auth.currentUser.phoneNumber).then((res) => {
                console.log(3, res.result.data())
                setUsername(res.result.data().name || '');
                setEmail(res.result.data().email || '');
            })
        }
    }, [])

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleForm = async () => {
        const { result, error } = await addData('users', auth.currentUser.phoneNumber, { email, name: username })

        if (error) {
            return console.log(error)
        }
        console.log(result);
    }

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    return (
        <div>
            <div className="container">
                <h1>Your Profile</h1>
                <div>
                    <label className="dos-prompt">Username:</label>
                    <input
                        className="dos-input"
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    <label className="dos-prompt">Phone:</label>
                    <input
                        className="dos-input"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <button className="dos-button" onClick={handleForm}>
                    submit
                </button>
            </div>
            <button className="dos-button" onClick={() => signOut(auth)}>
                get out
            </button>
            <span className="cursor"></span>
        </div>
    );
}

export default Page;