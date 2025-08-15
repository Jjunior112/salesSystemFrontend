import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [role, setRole] = useState(null);

    useEffect(() => {

        const storedRole = localStorage.getItem("role");

        if (storedRole) setRole(storedRole);
    }, []);

    return (
        <AuthContext.Provider value={{ role }}>
            {children}
        </AuthContext.Provider>
    );
}