import { FC } from "react";

export const Profile: FC = () => {
    const name = "Yura"
    const email = "123@gmail.com"
  return (
    
    <div  className="max-w-sm mx-auto bg-white rounded-lg">
      <div className="flex items-center space-x-4 p-6">
        <img
          className="w-16 h-16 rounded-full object-cover"
          src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
          alt=""
        />
        <div>
            <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
            <p className="text-gray-600">{email}</p>
        </div>
      </div>
    </div>
  );
};
