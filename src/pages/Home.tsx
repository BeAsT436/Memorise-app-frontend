import { useDispatch, useSelector } from "react-redux";
import { fetchMemories, selectMemoriesState } from "@/redux/memorySlice";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";

import { MemoryForm } from "@/components/MemoryForm";

import { Card } from "@/components/Card";

export const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { memories } = useSelector(selectMemoriesState);

  useEffect(() => {
    dispatch(fetchMemories());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-950">shared memories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {memories.map((memory) => (
          <Card memory={memory} key={memory._id} />
        ))}
      </div>
      <h1></h1>
      <MemoryForm />
    </div>
  );
};
