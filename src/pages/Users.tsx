import { SubscribeButton } from "@/components/SubscribeButton";
import { Card, CardContent } from "@/components/ui/card";
import { baseAvatar } from "@/consts/baseAvatar";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { getAllUsers, selectUserState } from "@/redux/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Users = () => {
  const { users } = useSelector(selectUserState);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  const currentUserID = useAppSelector((state) => state.user.user?._id);
  const filteredUsers =
    users?.filter((user) => user._id !== currentUserID) || [];
  return (
    <div className="w-full">
      <h1 className="text-lg font-bold">Members</h1>
      {filteredUsers?.map((user) => (
        <Card key={user._id}>
          <CardContent className="flex w-full justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full">
                <img src={user.avatar || baseAvatar} alt="avatar" />
              </div>
              <div>
                <div className=" text-lg font-semibold">{user.name}</div>
                <div className="text-xs text-gray-700">{user.email}</div>
              </div>
            </div>
            <SubscribeButton userId={user._id} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
