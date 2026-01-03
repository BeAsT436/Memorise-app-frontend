/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  addMemoryThunk,
  closeForm,
  selectMemoryForm,
  updateMemoryThunk,
} from "@/redux/memorySlice";
import { useEffect, useMemo } from "react";
import { uploadImg } from "@/utils/uploadImg";

const validationSchema = z.object({
  title: z
    .string()
    .min(5, { message: "min length 5 symbols" })
    .max(50, { message: "max length 50 symbols" }),
  desc: z
    .string()
    .min(10, { message: "min length 10 symbols" })
    .max(200, { message: "max length 200 symbols" }),
  img: z.string(),
  local: z.enum(["private", "public"], { message: "local is required" }),
});

export const MemoryForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const memoryToEdit = useSelector(selectMemoryForm);

  const isEditing = memoryToEdit && Object.keys(memoryToEdit).length > 0;

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: "",
      desc: "",
      img: "",
      local: "private",
    },
  });

  useEffect(() => {
    if (memoryToEdit) {
      form.reset(memoryToEdit);
    } else {
      form.reset({
        title: "",
        desc: "",
        img: "",
        local: "private",
      });
    }
  }, [form, memoryToEdit]);
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imgURL = await uploadImg(file);
    form.setValue("img", imgURL);
  };

  const handleClose = () => {
    form.reset();
    dispatch(closeForm());
  };

  function onSubmit(values: z.infer<typeof validationSchema>) {
    console.log("values: ", values);

    if (isEditing) {
      dispatch(updateMemoryThunk({ ...values, id: memoryToEdit._id }));
      //! todo fix type of updateMemory
    } else {
      dispatch(addMemoryThunk(values));
    }
    dispatch(closeForm());
  }
  const isOpen = useMemo(() => {
    return (
      !!memoryToEdit ||
      !!form.watch("title") ||
      !!form.watch("desc") ||
      // !!form.watch("local") ||
      !!form.watch("img")
    );
  }, [
    memoryToEdit,
    form.watch("title"),
    form.watch("desc"),
    // form.watch("local"),
    form.watch("img"),
  ]);
  return (
    <div
      className={`flex items-center justify-center fixed inset-0 bg-gray-900 bg-opacity-50 z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <Form {...form}>
        <form
          className="bg-white p-6 rounded-md max-w-2xl space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {fieldState.error && (
                  <p className="text-red-600 text-sm">
                    {fieldState.error.message}
                  </p>
                )}
              </FormItem>
            )}
          />
          <FormField
            name="desc"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Desc</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {fieldState.error && (
                  <p className="text-red-600 text-sm">
                    {fieldState.error.message}
                  </p>
                )}
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <FormField
              name="local"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <label>
                      <input
                        onChange={() => field.onChange("private")}
                        checked={field.value === "private"}
                        value={"private"}
                        type="radio"
                      />
                      private
                    </label>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="local"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <label>
                      <input
                        onChange={() => field.onChange("public")}
                        checked={field.value === "public"}
                        value={"public"}
                        type="radio"
                      />
                      public
                    </label>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {form.getValues().img && (
            <img alt="preview" src={form.getValues().img} />
          )}
          {/* <Button type="submit">add memory</Button> */}
          <div>
            <Button onClick={handleClose} type="button">
              close
            </Button>
            <Button type="submit">
              {isEditing ? "update Memory" : "add Memory"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
