import { selectAuthState } from "@/redux/authSlice";
import { Memory, deleteMemoryThunk, openEditForm } from "@/redux/memorySlice";
import { AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "./ui/button";
import {
  CardContent,
  CardHeader,
  CardTitle,
  Card as ShadcnCard,
} from "./ui/card";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
interface CardProps {
  memory: Memory;
}

const isValidUrl = (url:string):boolean=>{
 try {
  new URL(url) 
  return true
} catch (_error) {
  return false
}
}

export const Card: React.FC<CardProps> = ({ memory }) => {
  const { user } = useSelector(selectAuthState);
  const { img, title, desc, _id, createdAt } = memory;
  const defaultImg =
    "https://upload.wikimedia.org/wikipedia/commons/7/77/Pirogue_running_on_the_Mekong_at_golden_hour_between_Don_Det_and_Don_Khon_Laos.jpg";
  
  const validUrl = isValidUrl(img)?img:defaultImg;
  const isOwner = user?.userId === memory.userId;
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = (id: string) => {
    dispatch(deleteMemoryThunk(id));
  };
  const handleOpenEditForm = () => {
    dispatch(openEditForm(memory));
  };
  return (
    <ShadcnCard className="py-0 relative" key={memory.id}>
      <img
        src={validUrl}
        alt="river"
        className="w-full h-48 object-cover mb-3"
      />
      {isOwner && (
        <div className="absolute right-1 top-1 bg-black bg-opacity-40 p-1 rounded-md flex gap-1">
          <Button
            className=" bg-black bg-opacity-5"
            onClick={() => handleDelete(_id)}
            // variant={"destructive"}
            size={"sm"}
          >
            <TrashIcon className="!size-6 text-red-500" />
          </Button>
          <Button
            className=" bg-black bg-opacity-5 text-lg"
            onClick={handleOpenEditForm}
            //  variant={"secondary"}
            size={"sm"}
          >
            <PencilIcon className="!size-6 text-orange-500" />
          </Button>
        </div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 ">{desc}</p>
        <p className="text-sm text-gray-500 mt-2 text-right">
          created: {format(new Date(createdAt), "PPP")}
        </p>
      </CardContent>
    </ShadcnCard>
  );
};
