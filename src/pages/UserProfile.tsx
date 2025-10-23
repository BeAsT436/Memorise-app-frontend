import { Card } from "@/components/Card";
import { SubscribeButton } from "@/components/SubscribeButton";
import { baseAvatar } from "@/consts/baseAvatar";
import { selectMemoriesState } from "@/redux/memorySlice";
import { useAppSelector } from "@/redux/store";
import { selectUserState } from "@/redux/userSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

export const UserProfile = () => {
  const { id } = useParams();
  const { users } = useSelector(selectUserState);
  const { memories } = useAppSelector(selectMemoriesState);
  const userMemories = memories.filter((memory) => memory.userId == id);
  // todo fix bug
  const user = users?.find((user) => user._id == id);


  return (
    <div className="p-5">
      <div className="flex mb-5 ">
        <div>
          <img
            className="max-h-48"
            src={user?.avatar || baseAvatar}
            alt="avatar"
          />
        </div>
        <div className="text-2xl flex flex-col justify-around ml-5">
          <p>
            Name: <span className="font-medium text-white">{user?.name}</span>
          </p>
          <p>
            Email: <span className="font-medium text-white/80">{user?.email}</span>
          </p>
          <SubscribeButton userId={user!.id}/>
        </div>
      </div>

      <div>
        {userMemories.map((memory) => (
          <Card memory={memory} key={memory._id} />
        ))}
      </div>
    </div>
  );
};
