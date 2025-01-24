import { selectAuthState } from "@/redux/authSlice";
import { FC } from "react";
import { useSelector } from "react-redux";

export const Profile: FC = () => {
  const {user} = useSelector(selectAuthState)
  console.log(user);
  
  return (
    
    <div  className="max-w-sm mx-auto bg-white rounded-lg">
      <div className="flex items-center space-x-4 p-6">
        <img
          className="w-16 h-16 rounded-full object-cover"
          src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
          alt=""
        />
        <div>
            <h2 className="text-xl font-semibold text-gray-800">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};
