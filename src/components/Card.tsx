import { selectAuthState } from "@/redux/authSlice";
import { Memory, deleteMemoryThunk } from "@/redux/memorySlice";
import { AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "./ui/button";

interface CardProps {
  memory: Memory;
}

export const Card: React.FC<CardProps> = ({ memory }) => {
  const { user } = useSelector(selectAuthState);
  const defaultImg =
    "https://upload.wikimedia.org/wikipedia/commons/7/77/Pirogue_running_on_the_Mekong_at_golden_hour_between_Don_Det_and_Don_Khon_Laos.jpg";
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = (id: string) => {
    dispatch(deleteMemoryThunk(id));
  };
  return (
    <div className="bg-white rounded-md p-5">
      <img
        src={memory.img || defaultImg}
        alt="river"
        className="w-full h-48 object-cover mb-3"
      />
      <h2 className="text-lg font-bold">{memory.title}</h2>
      <p className="text-gray-600 ">{memory.desc}</p>
      {user?.userId === memory.userId && (
        <div>
          <Button
            onClick={() => handleDelete(memory._id)}
            variant={"destructive"}
          >
            delete
          </Button>
        </div>
      )}
    </div>
  );
};
