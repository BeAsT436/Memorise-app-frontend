import { FC, ReactNode } from "react";
import { Button } from "./ui/button";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export const Modal: FC<Props> = ({ onClose, open, title, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full bg-white max-w-lg p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <h2>{title}</h2>
          <Button className="bg-red-700 hover:bg-red-800 rounded-full w-10 h-10" onClick={onClose}>
            <XMarkIcon />
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
