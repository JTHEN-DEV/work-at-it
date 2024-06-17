export type User = {
    id: string;
    firstName: string;
    lastName: string;
    status: "online" | "offline" | "busy";
};

export type Session = {
    startTime: number; // Number of date stamp
    endTime: number | null; // Null if still going
    users: string[]; // String of user ids
};

export type Notification = {
    startTime;
};

export type userDataStore = {
    user: User;
    sessions: Session[];
};

export type DataContextType = {
    userData: User;
    sessionData: Session[];
    friendsList: Friendship[];
    newSession: () => Promise<void>;
    newFriendship: (userId1: string, userId2: string) => Promise<void>;
    // TODO: Add and Delete Users?
};

export type DataProviderPropsType = {
    children: React.ReactNode;
};
