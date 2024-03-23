import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { logoutUser } from "../redux/userReducer";
const NavBar = () => {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    //setUserInfo({});  Not working reason not known yet, setUserInfo is function from useLocalStorage hook
    localStorage.removeItem("userInfo");
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center w-full">
      {/* Logo on the left */}
      <div>
        <span className="text-white text-lg font-semibold">MyChat</span>
      </div>
      <div>
        <span className="text-white">{userInfo.userName}</span>
        <span
          className="text-white m-2 hover:cursor-pointer"
          onClick={logoutHandler}>
          Logout
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
