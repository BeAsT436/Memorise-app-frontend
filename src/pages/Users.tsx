import { AppDispatch } from "@/redux/store";
import { getAllUsers, selectUserState } from "@/redux/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Users = () => {
  const { users } = useSelector(selectUserState);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  return (
    <div>
      {users?.map((user) => (
        <div>{user.name}</div>
      ))}
    </div>
  );
};
