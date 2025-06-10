import { selectAuthState } from "@/redux/authSlice";
import { Memory, deleteMemoryThunk, openEditForm} from "@/redux/memorySlice";
import { AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { CardContent, CardHeader, CardTitle, Card as ShadcnCard } from "./ui/card";

interface CardProps {
  memory: Memory;
}

export const Card: React.FC<CardProps> = ({ memory }) => {
  const { user } = useSelector(selectAuthState);
  const {img, title, desc, _id} = memory
  const defaultImg =
    "https://upload.wikimedia.org/wikipedia/commons/7/77/Pirogue_running_on_the_Mekong_at_golden_hour_between_Don_Det_and_Don_Khon_Laos.jpg";
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = (id: string) => {
    dispatch(deleteMemoryThunk(id));
  };
  const handleOpenEditForm = ()=>{
    dispatch(openEditForm(memory))
  }
  return (
    <ShadcnCard>
      <img
        src={img || defaultImg}
        alt="river"
        className="w-full h-48 object-cover mb-3"
      />
      <CardHeader>
        <CardTitle>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 ">{desc}</p>
      </CardContent>

      {user?.userId === memory.userId && (
        <div>
          <Button
            onClick={() => handleDelete(_id)}
            variant={"destructive"}
          >
            delete
          </Button>
          <Button
           onClick={handleOpenEditForm}
           variant={"secondary"}>
            edit
          </Button>
        </div>
      )}
    </ShadcnCard>
  );
};
