import { selectCurrentUserId } from "@/redux/authSlice";
import { Memory } from "@/redux/memorySlice";
import { useSelector } from "react-redux";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Card as ShadcnCard,
} from "./ui/card";
import { format } from "date-fns";
import { Link } from "react-router";
import { defaultImg } from "@/consts/baseMemoryIMG";
import { isValidUrl } from "@/utils/isValidUrl";
import { MemoryOwnerActions } from "./MemoryOwnerActions";
import { TogglePrivacy } from "./TogglePrivacy";

interface CardProps {
  memory: Memory;
}

export const Card: React.FC<CardProps> = ({ memory }) => {
  const currentUserId = useSelector(selectCurrentUserId);

  const { img, title, desc, id, createdAt, local, author, userId } = memory;
  const isOwner = currentUserId === userId;

  const validUrl = isValidUrl(img) ? img : defaultImg;

  return (
    <ShadcnCard className="py-0 relative" key={memory.id}>
      <img
        src={validUrl}
        alt="river"
        className="w-full h-48 object-cover mb-3"
      />

      {isOwner && <MemoryOwnerActions memory={memory} />}
      <CardHeader>
        <CardDescription className="font-semibold">
          <span className="font-bold">Owner:</span>{" "}
          <Link to={`/users/${userId}`}>{author?.name}</Link>
        </CardDescription>

        <CardTitle>
          <Link to={`/memory/${id}`}>{title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 ">
          <Link to={`/memory/${id}`}>{desc}</Link>
        </p>
        <p className="text-sm text-gray-500 mt-2 text-right">
          created: {format(new Date(createdAt), "PPP")}
        </p>
        {isOwner && <TogglePrivacy memoryId={id} local={local} />}
      </CardContent>
    </ShadcnCard>
  );
};
