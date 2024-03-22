import useLocalStorage from "../hooks/useLocalStorage";
interface LoginInfoInterface {
  email?: string;
  userName?: string;
  accessToken?: string;
  refreshToken?: string;
}
const NavBar = () => {
  const [userInfo] = useLocalStorage<LoginInfoInterface>("userInfo", {});
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center w-full">
      {/* Logo on the left */}
      <div>
        <span className="text-white text-lg font-semibold">MyChat</span>
      </div>
      <div>
        <span className="text-white">{userInfo.userName}</span>
      </div>
    </nav>
  );
};

export default NavBar;
