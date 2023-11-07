'use client'
import React from 'react'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/config'
import addData from '@/firebase/firestore/addData'
import getDocument from '@/firebase/firestore/getData'
import { IUser } from '@/firebase/firestore/types';


function Page() {
  const { user } = useAuthContext();
  const router = useRouter()
  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [emailError, setEmailError] = React.useState("")

  React.useEffect(() => {
    if (auth.currentUser?.phoneNumber) {
      getDocument('users', auth.currentUser.phoneNumber).then((res ) => {
        const responseData = res.result as unknown as { data: () => IUser }
        if (responseData) {
          setUsername(responseData.data().name || '')
          setEmail(responseData.data().email || '')
        }
      })
    }
  }, [])

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail)
    // Basic email validation
    if (!isValidEmail(newEmail)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  }

  const isValidEmail = (email) => {
    // Basic email format validation using regular expression
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const handleForm = async () => {
    if (!auth?.currentUser?.phoneNumber) {
      return;
    }
    const { result, error } = await addData(
      'users',
      auth.currentUser.phoneNumber,
      { email, name: username },
    )

    if (error) {
      return console.log(error)
    }
  }

  React.useEffect(() => {
    if (!user) router.push('/')
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
          <label className="dos-prompt">Email:</label>
          <input
            className="dos-input"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        <button className="dos-button" onClick={handleForm}>
          submit
        </button>
      </div>
      <button className="dos-button" onClick={() => signOut(auth)}>
        get out
      </button>
      <span className="cursor"></span>
    </div>
  )
}

export default Page
