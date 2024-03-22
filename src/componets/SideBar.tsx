import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface UserListInterface {
  userName: string;
  email: string;
}

interface LoginInfoInterface {
  email?: string;
  userName: string;
  accessToken: string;
  refreshToken: string;
}

const SideBar = () => {
  const [userList, setUserList] = useState<UserListInterface[]>([]);
  const [userInfo] = useLocalStorage<LoginInfoInterface>("userInfo", {
    accessToken: "",
    userName: "User",
    refreshToken: "",
  });

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/auth/allUsers",
          {
            method: "GET",
            headers: new Headers({
              Authorization: userInfo.refreshToken,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();

        if (!Array.isArray(data.data)) {
          throw new Error("Response is not an array");
        }

        setUserList(data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="p-2 w-full min-w-[240px]">
        <input type="text" placeholder="Search" />
      </div>
      <div>
        {userList.map((user) => {
          return <div>{user.userName}</div>;
        })}
      </div>
    </div>
  );
};

export default SideBar;
