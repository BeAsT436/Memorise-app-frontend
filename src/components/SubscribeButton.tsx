import { useAppDispatch, useAppSelector } from "@/redux/store";
import { subscribe,unsubscribe } from "@/redux/userSlice";

export const SubscribeButton = ({ userId }: { userId: string }) => {
  const dispatch = useAppDispatch();
  const subscriptions = useAppSelector((state) => state.user.subscriptions);
  const isSubscribed = subscriptions.includes(userId);
  
  return (
    <button
      onClick={() => (isSubscribed ? dispatch(unsubscribe(userId)) : dispatch(subscribe(userId)))}
      className={`px-4 py-2 rounded-lg ${
        isSubscribed ? "bg-white text-[#fa2a2a]" : "bg-[#fa2a2a] text-white"
      }`}
    >
      {isSubscribed ? "unsubscribe" : "subscribe"}
    </button>
  );
};
