import { Sidebar } from "@/components/Sidebar";
import logo from "../assets/logo.png";
import { Outlet } from "react-router";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { fetchMemories, openForm } from "@/redux/memorySlice";
import { useEffect } from "react";
import { AppDispatch } from "@/redux/store";

export const MainLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleOpenForm = () => {
    dispatch(openForm());
  };
  useEffect(()=>{
    dispatch(fetchMemories())
  },[dispatch])
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center ">
        <img src={logo} alt="logo" className="h-24 w-24 rounded-full" />

        <Button onClick={handleOpenForm}>+ add memory</Button>
      </header>
      <div className="flex flex-1 ">
        {/* todo make adaptive design(hide sidebar into burger) */}
        <Sidebar />
        <main className="flex flex-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
