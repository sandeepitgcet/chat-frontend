import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { setAllUsers } from "../redux/userReducer";
import { ContactList } from "../util/types";
import { setCurrentChatUser } from "../redux/chatReducer";

const SideBar = () => {
  const auth = useAppSelector((state) => state.auth);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const contactList = useAppSelector((state) => state.user.allUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/auth/allUsers",
          {
            method: "GET",
            headers: new Headers({
              Authorization: auth.accessToken || "",
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        console.log(data.data);
        dispatch(setAllUsers(data.data));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  const changeChatUserHandler = (user: ContactList) => {
    dispatch(setCurrentChatUser(user.userName));
  };

  console.log("COntact list", contactList, userInfo);
  return (
    <div className="flex flex-col">
      <div className="p-2 w-full min-w-[240px]">
        <input type="text" placeholder="Search" />
      </div>
      <div className="p-2 ">
        {contactList.map((user) => {
          if (user.userName == userInfo.userName) {
            return null;
          }
          return (
            <div
              key={user.userName}
              onClick={() => changeChatUserHandler(user)}
              className="text-yellow-100 hover:bg-slate-600 hover:cursor-pointer">
              {user.userName}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
