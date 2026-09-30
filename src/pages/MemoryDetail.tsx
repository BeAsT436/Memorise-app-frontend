import { Button } from "@/components/ui/button";
import { defaultImg } from "@/consts/baseMemoryIMG";
import { selectMemoriesState } from "@/redux/memorySlice";
import { selectUserState } from "@/redux/userSlice";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

export const MemoryDetail = () => {
  const { id } = useParams();
  const { memories, myMemories } = useSelector(selectMemoriesState);
  const { user } = useSelector(selectUserState);
  const navigate = useNavigate();
  const memory = memories.find((memory) => memory.id === id);
  const myMemory = myMemories.find((memory) => memory.id === id);
  const m = memory?memory:myMemory

  if (!m) {
    return (
      <div className="flex flex-col items-center w-full justify-center gap-4">
        <p className=" text-2xl text-gray-100">memory not found</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }
  console.log("m:", m);
  
  const {title, desc, img, createdAt } = m

  //todo add ability to delete, change status if it owns, user

  return (
    <div className="flex flex-col">
      <div>MemoryDetail: {id}</div>
      <div>title: {title}</div>
      <div>desc: {desc}</div>
      <img src={img || defaultImg} alt="" className="w-96 h-96" />
      <div>author: {user?.name}</div>
      <div>createdAt: {createdAt}</div>
      {myMemory && <div>buttons to control</div>}
      <div>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    </div>
  );
};
