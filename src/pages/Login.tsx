import { FC, } from "react";
import { AuthForm } from "@/components/AuthForm";

export const Login: FC = () => {
 
  return (
    <div className="justify-center flex items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <AuthForm isLogin={true}/>
    </div>
  );
};
