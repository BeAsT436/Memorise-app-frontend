import { Button } from "@/components/ui/button";
import logo from "../assets/logo.png";
export const Landing = () => {
  return (
    <div className="reletive bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 h-screen flex flex-col justify-center items-center text-white">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="reletive px-6 md:px-12 max-w-7xl mx-auto">
        <div>
          <img className="h-30 w-30 md:h-40 md:w-40 mx-auto rounded-full shadow-lg bg" src={logo} alt="logo" />
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold my-5 drop-shadow-lg">Save your Memorize </h1>
        <p className="text-lg md:text-xl max-w-2xl  ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, dicta
          nihil quo blanditiis accusamus nemo nulla, architecto in cupiditate
          dignissimos voluptates. Quos, minima recusandae consequuntur nobis
          ratione at ab necessitatibus!{" "}
        </p>
        <div className="flex space-x-4 justify-center">
            <Button variant={"secondary"}>get started</Button>
            <Button variant={"secondary"}>sing in</Button>
        </div>
      </div>

      <footer><p>&copy;2024 memorize app</p></footer>
    </div>
  );
};
