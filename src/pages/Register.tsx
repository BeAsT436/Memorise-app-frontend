import { AuthForm } from "@/components/AuthForm";
import { FC } from "react";

export const Register: FC = () => {
  return (
    <div className="justify-center flex items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <AuthForm isLogin={false} />
    </div>
  );
};
