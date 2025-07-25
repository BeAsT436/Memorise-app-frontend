import { Button } from "@/components/ui/button";
import { Card as ShadcnCard } from "@/components/ui/card";
import { Card } from "@/components/Card";
import { Input } from "@/components/ui/input";
import { logout, selectAuthState } from "@/redux/authSlice";
import { useAppDispatch } from "@/redux/store";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  CheckIcon,
  PencilIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { fetchMyMemories, selectMemoriesState } from "@/redux/memorySlice";
import { getProfile, selectUserState, updateUser } from "@/redux/userSlice";

export const Profile: FC = () => {
  const { user: authUser } = useSelector(selectAuthState);
  const { user } = useSelector(selectUserState);
  const { myMemories } = useSelector(selectMemoriesState);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("effect");

    dispatch(fetchMyMemories());
    if (authUser?.userId) dispatch(getProfile(authUser?.userId));
  }, [dispatch, authUser?.userId]);

  if (!user?._id) return null;

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSave = () => {
    dispatch(updateUser({ name, email, id: user?._id }));
    setIsEditing(false);
  };
  // todo update image with cloudinary
  return (
    <ShadcnCard className="w-full p-4 ">
      <div className="flex items-center justify-between p-6 bg-slate-500 rounded-lg">
        <div className="flex items-center space-x-4">
          {/* image here */}
          <div>
            {isEditing ? (
              <Button onClick={handleSave} className="rounded-full w-14 h-14">
                <CheckIcon />
              </Button>
            ) : (
              <Button
                className="rounded-full w-14 h-14"
                onClick={() => {
                  setName(user.name);
                  setEmail(user.email);
                  setIsEditing(true);
                }}
              >
                <PencilIcon />
              </Button>
            )}
          </div>
          <img
            className="w-16 h-16 rounded-full object-cover"
            src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
            alt=""
          />

          {isEditing ? (
            <div className="flex flex-col gap-2">
              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {user?.name}
              </h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          )}
        </div>
        <Button variant={"destructive"} onClick={handleLogout}>
          <ArrowLeftEndOnRectangleIcon className="!size-6" />
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {myMemories.map((memory) => (
          <Card memory={memory} key={memory.id} />
        ))}
      </div>
    </ShadcnCard>
  );
};
