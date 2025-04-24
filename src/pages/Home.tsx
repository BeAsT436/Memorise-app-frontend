import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.png";
import {
  deleteMemoryThunk,
  fetchMemories,
  Memory,
  selectMemoriesState,
} from "@/redux/memorySlice";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MemoryForm } from "@/components/MemoryForm";
import { selectAuthState } from "@/redux/authSlice";

export const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { memories } = useSelector(selectMemoriesState);

  useEffect(() => {
    dispatch(fetchMemories());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header>
        <img src={logo} alt="logo" className="h-36 w-36 rounded-full" />
      </header>
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {memories.map((memory) => (
            <Card memory={memory} key={memory._id} />
          ))}
        </div>
      </main>
      <MemoryForm />
    </div>
  );
};

interface CardProps {
  memory: Memory;
}

const Card: React.FC<CardProps> = ({ memory }) => {
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
      {user?.id === memory.userId && (
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
