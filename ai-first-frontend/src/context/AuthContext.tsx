import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthUser } from "../types";


interface AuthContextType{
    user: AuthUser | null;
    token: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: () => boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            setUserFromToken(storedToken);
        }
    }, []);

    const setUserFromToken = (token: string) => {
        try {
            const decoded = jwtDecode<AuthUser & {userId: string}>(token);
            setUser({
                id: decoded.userId,
                companyId: decoded.companyId,
                companyName: decoded.companyName,
                tenantId: decoded.tenantId,
                name: decoded.name,
                email: decoded.email,
                image: decoded.image
            });
        } catch (err) {
            console.error("Erro ao decodificar o token!", err);
            logout();
        }
    };

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const response = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            localStorage.setItem("token", data.token);
            setToken(data.token);
            setUser(data.user);
            return true;
        } catch (err) {
            console.error("Erro no login: ", err);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    const isAuthenticated = () => !!token;

    return (
        <AuthContext.Provider value={{user, token, login, logout, isAuthenticated}}>{children}</AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);