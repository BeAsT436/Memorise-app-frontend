import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.png";
import { fetchMemories, selectMemoriesState } from "@/redux/memorySlice";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
export const Home = () => {

  const dispatch = useDispatch<AppDispatch>()
  const { memories } = useSelector(selectMemoriesState);
  console.log(memories);
  
  
  useEffect(()=>{
    dispatch(fetchMemories())
  },[dispatch])

  const defaultImg =
    "https://upload.wikimedia.org/wikipedia/commons/7/77/Pirogue_running_on_the_Mekong_at_golden_hour_between_Don_Det_and_Don_Khon_Laos.jpg";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header>
        <img src={logo} alt="logo" className="h-36 w-36 rounded-full" />
      </header>
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-md p-5">
            <img
              src={defaultImg}
              alt="river"
              className="w-full h-48 object-cover mb-3"
            />
            <h2 className="text-lg font-bold">Memories</h2>
            <p className="text-gray-600 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ipsam
              dignissimos aut delectus soluta eligendi dolore vero voluptates
              recusandae aspernatur hic explicabo odit, suscipit ab nobis. Omnis
              doloribus officia sit! Sunt, magnam! Velit quod fuga consequuntur
              voluptas! Nihil libero eaque ducimus dolor optio accusamus
              obcaecati, totam animi alias, quis tenetur mollitia, autem nisi
              ipsam dicta tempore fuga vero? Facere, quis. Temporibus deleniti
              repellat maxime placeat modi iure distinctio ab enim cum accusamus
              magni velit, officiis repellendus dolorum voluptatum blanditiis id
              voluptatem, vero officia culpa dolore. Rerum earum accusamus
              aperiam corrupti?
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
