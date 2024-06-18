import React, { createContext, useContext, useEffect, useState } from "react";
import {
    DataContextType,
    DataProviderPropsType,
    Session,
    User,
} from "../@types/data";
import { AuthContext } from "./AuthContext";
import supabase from "../api/supabase";

const DataContext = createContext<DataContextType>({} as DataContextType);

const DataProvider: React.FC<DataProviderPropsType> = ({ children }) => {
    const [userData, setUserData] = useState({} as User);
    const [sessionData, setSessionData] = useState([]);
    const [friendsList, setFriendsList] = useState<User[]>([]);
    const [pendingFriendsList, setPendingFriendsList] = useState<User[]>([]); // List of user ids

    const { user } = useContext(AuthContext);

    const getUserData = async () => {
        if (!user) {
            console.error(
                "Attempted to retrieve user data without a signed in user"
            );
            return;
        }
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("user_id", user.id);
        if (error) {
            console.error(
                "An error occurred while attempting to retrieve the user data:",
                error
            );
        } else if (!data) {
            console.error(
                "No data was returned when attempting to retrieve the user data:"
            );
        } else {
            // Retrieve the data
            const retrievedUserData = data[0];
            setUserData({
                id: retrievedUserData.user_id,
                firstName: retrievedUserData.first_name,
                lastName: retrievedUserData.last_name,
                status: retrievedUserData.status,
            });
        }
    };

    const getFriendshipData = async () => {
        if (!user) {
            console.error(
                "Attempted to retrieve user friendship data without a signed in user"
            );
            return;
        }
        const { data, error } = await supabase
            .from("users")
            .select(
                "users.user_id, users.first_name, users.last_name, users.status"
            )
            .eq("friendships.status", "accepted");
        if (error) {
            console.error(
                "An error occurred while attempting to retrieve user pending friendship data:",
                error
            );
        } else {
            // setFriendsList(
            //     data.map((friend) => ({
            //         id: friend.user_id,
            //         firstName: friend.first_name,
            //         lastName: friend.last_name,
            //         status: friend.status,
            //     }))
            // );
        }
    };

    const getPendingFriendshipData = async () => {
        if (!user) {
            console.error(
                "Attempted to retrieve user pending friendship data without a signed in user"
            );
            return;
        }
        const { data, error } = await supabase.from("users").select("*");
        if (error) {
            console.error(
                "An error occurred while attempting to retrieve user pending friendship data:",
                error
            );
        } else {
            setPendingFriendsList(
                data.map((pendingFriend) => ({
                    id: pendingFriend.user_id,
                    firstName: pendingFriend.first_name,
                    lastName: pendingFriend.last_name,
                    status: pendingFriend.status,
                }))
            );
        }
    };

    // Get all user data
    useEffect(() => {
        if (user) {
            // User is logged in so extract all user data
            getUserData();
            // getFriendshipData();
            // getPendingFriendshipData();
        }
    }, [user]);

    const newSession = async () => {};

    const newFriendship = async (userId1: string, userId2: string) => {};

    return (
        <DataContext.Provider
            value={{
                userData,
                sessionData,
                friendsList,
                newSession,
                newFriendship,
            }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };
