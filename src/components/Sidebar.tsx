import { Link } from "react-router";

export const Sidebar = () => {
  return (
    <div className="bg-blue-900 text-white p-2 min-w-[200px]">
      <nav>
        <ul className="">
          <li>
            <Link to={"/profile"}>profile</Link>
          </li>
          <li>
            <Link to={"/home"}>home</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
