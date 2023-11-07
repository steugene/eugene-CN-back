import React from 'react';
import {
    onAuthStateChanged,
} from 'firebase/auth';
import  { auth } from '@/firebase/config';


export const AuthContext = React.createContext({} as any);

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
                                        children,
                                    }: any) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user as any);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
    {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
    );
    };