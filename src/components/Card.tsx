import { selectCurrentUserId } from "@/redux/authSlice";
import {
  Memory,
  changeLocalMemoryThunk,
  deleteMemoryThunk,
  openEditForm,
} from "@/redux/memorySlice";
import { AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "./ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Card as ShadcnCard,
} from "./ui/card";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { Modal } from "./Modal";
import { useState } from "react";
import { Link } from "react-router";
import { defaultImg } from "@/consts/baseMemoryIMG";
import { isValidUrl } from "@/utils/isValidUrl";

interface CardProps {
  memory: Memory;
}

export const Card: React.FC<CardProps> = ({ memory }) => {
  const currentUserId = useSelector(selectCurrentUserId);
  const { img, title, desc, id, createdAt, local, author, userId } = memory;

  const [open, setOpen] = useState(false);

  const validUrl = isValidUrl(img) ? img : defaultImg;
  const isOwner = currentUserId === memory.userId;
  const dispatch = useDispatch<AppDispatch>();
  //todo add modal window to confirm deleting

  const handleDelete = (id: string) => {
    dispatch(deleteMemoryThunk(id));
  };

  const handleChangeLocal = (id: string) => {
    dispatch(changeLocalMemoryThunk(id));
  };

  const handleOpenEditForm = () => {
    dispatch(openEditForm({ ...memory, img: defaultImg }));
  };

  const handleCloseModal = () => setOpen(false);

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
            onClick={() => {
              setOpen(true);
            }}
            className=" bg-black bg-opacity-5"
            size={"sm"}
          >
            <TrashIcon className="!size-6 text-red-500" />
          </Button>
          <Button
            className=" bg-black bg-opacity-5 text-lg"
            onClick={() => {
              handleOpenEditForm();
            }}
            size={"sm"}
          >
            <PencilIcon className="!size-6 text-orange-500" />
          </Button>
        </div>
      )}
      <CardHeader>
        <CardDescription className="font-semibold">
          <span className="font-bold">Owner:</span>{" "}
          <Link to={`/users/${userId}`}>{author?.name}</Link>
        </CardDescription>
        
        <CardTitle><Link to={`/memory/${id}`}>{title}</Link></CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 "><Link to={`/memory/${id}`}>{desc}</Link></p>
        <p className="text-sm text-gray-500 mt-2 text-right">
          created: {format(new Date(createdAt), "PPP")}
        </p>
        {isOwner && (
          <Button
            className="my-5"
            onClick={() => {
              handleChangeLocal(id);
            }}
          >
            change to {local === "private" ? "public" : "private"}
          </Button>
        )}
      </CardContent>

      <Modal
        title="Are you absolutely sure?"
        onClose={handleCloseModal}
        open={open}
      >
        <p className="text-gray-500 pb-3">
          this action will delete the memory forever
        </p>
        <Button onClick={() => handleDelete(id)}>deleting</Button>
      </Modal>
    </ShadcnCard>
  );
};
