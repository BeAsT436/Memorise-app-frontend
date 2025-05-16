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
    <>
      <div>
        {memories.map((memory) => (
          <Card memory={memory} key={memory._id} />
        ))}
      </div>
      <MemoryForm />
    </>
  );
};
