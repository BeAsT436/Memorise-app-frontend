import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { AppDispatch } from "@/redux/store";
import { changeLocalMemoryThunk, Local } from "@/redux/memorySlice";

interface TogglePrivacyProps {
  memoryId: string;
  local: Local;
}

export const TogglePrivacy = ({ memoryId, local }: TogglePrivacyProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const privacyState = local === "private" ? "public" : "private";

  const handleChangeLocal = (id: string) => {
    dispatch(changeLocalMemoryThunk({id, local}));
  };

  return (
    <Button
      className="my-5"
      onClick={() => {
        handleChangeLocal(memoryId);
      }}
    >
      change to {privacyState}
    </Button>
  );
};
