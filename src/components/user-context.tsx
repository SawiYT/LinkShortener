import React, { createContext, useState, ReactNode, useContext } from 'react';

type UserInfo = {
	username: string;
};

type UserContextType = {
	userInfo: UserInfo | null;
	setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
	children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

	return <UserContext.Provider value={{ userInfo, setUserInfo }}>{children}</UserContext.Provider>;
};


export const useUserContext = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUserContext must be used within a UserProvider');
	}
	return context;
};
