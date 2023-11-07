import React from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { IUser } from '@/firebase/firestore/types'

type IContext = {
  user: IUser;
}

export const AuthContext = React.createContext<IContext>({} as IContext)

export const useAuthContext = () => React.useContext(AuthContext)

export const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = React.useState<IUser | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user as unknown as IUser)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user } as IContext}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  )
}
