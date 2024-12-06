import { Button } from "@/components/ui/button";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="reletive bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 h-screen flex flex-col justify-center items-center text-white">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="reletive px-6 md:px-12 max-w-7xl mx-auto">
        <div>
          <img
            className="h-30 w-30 md:h-40 md:w-40 mx-auto rounded-full shadow-lg bg"
            src={logo}
            alt="logo"
          />
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold my-5 drop-shadow-lg">
          Save your Memorize{" "}
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, dicta
          nihil quo blanditiis accusamus nemo nulla, architecto in cupiditate
          dignissimos voluptates. Quos, minima recusandae consequuntur nobis
          ratione at ab necessitatibus!{" "}
        </p>
        <div className="flex space-x-4 justify-center">
          <Button
            onClick={() => {
              navigate("/register");
            }}
            size={"lg"}
            variant={"secondary"}
          >
            get started(register)
          </Button>
          <Button
            onClick={() => {
              navigate("/login");
              console.log("win");
            }}
            size={"lg"}
            variant={"outline"}
          >
            sing in
          </Button>
        </div>
      </div>

      <footer className="absolute bottom-6 text-sm ">
        <p>&copy;2024 memorize app</p>
      </footer>
    </div>
  );
};
