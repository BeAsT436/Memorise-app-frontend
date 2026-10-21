import { useDispatch } from "react-redux";
import { Modal } from "./Modal";
import { Button } from "./ui/button";
import { AppDispatch } from "@/redux/store";
import { deleteMemoryThunk } from "@/redux/memorySlice";
import { FC } from "react";

interface ModalMemoryDeleteProps {
  onClose: () => void;
  open: boolean;
  memoryId: string;
}

export const ModalMemoryDelete: FC<ModalMemoryDeleteProps> = ({
  memoryId,
  open,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = (id: string) => {
    dispatch(deleteMemoryThunk(id));
  };
  return (
    <Modal title="Are you absolutely sure?" onClose={onClose} open={open}>
      <p className="text-gray-500 pb-3">
        this action will delete the memory forever
      </p>
      <Button onClick={() => handleDelete(memoryId)}>delete</Button>
    </Modal>
  );
};
