import { routes } from "@/consts/routes";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`bg-blue-900 text-white p-2 min-w-[200px] z-40 fixed left-0 inset-y-0 md:static transform transition-transform md:translate-x-0 duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button onClick={onClose} className="md:hidden p-2"><XMarkIcon className=" w-12 h-12"/></button>
        
        <nav>
          <ul className={`flex gap-3 flex-col pt-3 ${isOpen ? "items-center " : " pl-3"}`}>
            {routes.map((route) => (
              <li className="text-2xl" key={route.to}>
                <Link to={route.to}>{route.title}</Link>
              </li>
            ))}
          </ul>
          {/* todo add logout button to the bottom of sidebar(links) */}
        </nav>
      </div>
    </>
  );
};
