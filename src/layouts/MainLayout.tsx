import { Sidebar } from "@/components/Sidebar";
import logo from "../assets/logo.png";
import { Outlet } from "react-router";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { openForm } from "@/redux/memorySlice";

export const MainLayout = () => {
const dispatch = useDispatch()
const handleOpenForm = ()=>{
  dispatch(openForm())
}
  return (
    <div className="flex flex-col min-h-screen">
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center ">
            <img src={logo} alt="logo" className="h-24 w-24 rounded-full" />
          
            <Button onClick={handleOpenForm}>+ add memory</Button>
        </header>
        <div className="flex flex-1 ">
            <Sidebar/>
            <main className="flex flex-1" >
                <Outlet/>
            </main>
        </div>
    </div>
  )
}
