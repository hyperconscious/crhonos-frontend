import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/user';
import UserService from '../services/UserService';

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const tokens = JSON.parse(localStorage.getItem('tokens') || '{}');
            if (tokens.accessToken && tokens.refreshToken) {
                try {
                    const user = await UserService.getMyProfile();
                    setUser(user);
                } catch (error) {
                    console.error('Failed to fetch user profile', error);
                }
            }
        };
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
