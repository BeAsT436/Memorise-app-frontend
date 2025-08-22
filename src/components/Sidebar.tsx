import { routes } from "@/consts/routes";
import { Link } from "react-router";



export const Sidebar = () => {
  return (
    <div className="bg-blue-900 text-white p-2 min-w-[200px]">
      <nav>
        <ul>
          {routes.map((route) => (
            <li key={route.to}>
              <Link to={route.to}>{route.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
