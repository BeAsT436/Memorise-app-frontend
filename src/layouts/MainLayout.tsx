import { Sidebar } from "@/components/Sidebar";
import logo from "../assets/logo.png";
import { Outlet } from "react-router";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { fetchMemories, openForm } from "@/redux/memorySlice";
import { useEffect, useState } from "react";
import { AppDispatch } from "@/redux/store";
import { Bars3Icon, PlusIcon } from "@heroicons/react/24/outline";

export const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const dispatch = useDispatch<AppDispatch>();
  const handleOpenForm = () => {
    dispatch(openForm());
  };

  useEffect(() => {
    dispatch(fetchMemories());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">

        <div className="flex items-center gap-4">
          <img src={logo} alt="logo" className="h-12 w-12 rounded-full md:h-24 md:w-24" />
          {/* todo move to burgerButton */}
          <button onClick={()=>setSidebarOpen(true)} className="md:hidden">
            <Bars3Icon  className="w-7 h-7" />
          </button>
        </div>
        
        <Button onClick={handleOpenForm} className="max-[767px]:hidden">+ add memory</Button>
        <Button onClick={handleOpenForm} className="md:hidden"><PlusIcon className="w-12 h-12"/></Button>
      </header>
      <div className="flex flex-1 ">
        <Sidebar isOpen={sidebarOpen} onClose={()=>setSidebarOpen(false)}/>
        <main className="flex flex-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
