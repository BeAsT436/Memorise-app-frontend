import { selectAuthState } from "@/redux/authSlice";
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
import { Link, useNavigate } from "react-router";
import { defaultImg } from "@/consts/baseMemoryIMG";
// import { defaultAuthorName } from "@/consts/defaultAuthorName";
// import { userURL } from "@/consts/api-urls";
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
interface CardProps {
  memory: Memory;
}

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (_error) {
    return false;
  }
};

export const Card: React.FC<CardProps> = ({ memory }) => {
  const { token } = useSelector(selectAuthState);
  const navigate = useNavigate();
  const { img, title, desc, id, createdAt, local, author, userId } = memory;

  const [open, setOpen] = useState(false);

  const validUrl = isValidUrl(img) ? img : defaultImg;
  const isOwner = token?.userId === memory.userId;
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
    <ShadcnCard
      onClick={() => navigate(`/memory/${id}`)}
      className="py-0 relative"
      key={memory.id}
    >
      <img
        src={validUrl}
        alt="river"
        className="w-full h-48 object-cover mb-3"
      />
      {isOwner && (
        <div className="absolute right-1 top-1 bg-black bg-opacity-40 p-1 rounded-md flex gap-1">
          {/* todo prevent opening detail page after clicking*/}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
            className=" bg-black bg-opacity-5"
            size={"sm"}
          >
            <TrashIcon className="!size-6 text-red-500" />
          </Button>
          <Button
            className=" bg-black bg-opacity-5 text-lg"
            onClick={(e) => {
              e.stopPropagation();
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
          {/* {author?.name || defaultAuthorName} */}
          {/* todo add user.id in Link */}
          <Link onClick={(e)=>{e.stopPropagation()}} to={`/users/${userId}`}>{author?.name}</Link>
        </CardDescription>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 ">{desc}</p>
        <p className="text-sm text-gray-500 mt-2 text-right">
          created: {format(new Date(createdAt), "PPP")}
        </p>
        {isOwner && (
          <Button
            className="my-5"
            onClick={(e) => {
              e.stopPropagation();
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
