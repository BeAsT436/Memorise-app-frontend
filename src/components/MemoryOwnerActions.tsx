import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { Memory, openEditForm } from "@/redux/memorySlice";
import { FC, useState } from "react";
import { ModalMemoryDelete } from "./ModalMemoryDelete";
import { defaultImg } from "@/consts/baseMemoryIMG";

interface MemoryOwnerActionsProps {
  memory: Memory;
}

export const MemoryOwnerActions: FC<MemoryOwnerActionsProps> = ({ memory }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);

  const handleOpenEditForm = () => {
    dispatch(openEditForm({ ...memory, img: defaultImg }));
  };
  return (
    <>
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

      <ModalMemoryDelete
        open={open}
        onClose={() => setOpen(false)}
        memoryId={memory.id}
      />
    </>
  );
};
