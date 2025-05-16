import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addMemoryThunk, Memory, selectMemoryForm } from "@/redux/memorySlice";
import axios from "axios";
import { useEffect, useState } from "react";

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

const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const UPLOAD_BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL;
const UPLOAD_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_URL = `${UPLOAD_BASE_URL}/${UPLOAD_CLOUD_NAME}/image/upload`;

export const MemoryForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<Partial<Memory>>({
    title: "",
    desc: "",
    img: "",
    local: "private",
  });

  const memoryToEdit = useSelector(selectMemoryForm);

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: formData,
  });
  useEffect(() => {
    console.log("effect");
    if (memoryToEdit) {
      setFormData(memoryToEdit);
    } else {
      setFormData(form.getValues());
    }
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imgForm = new FormData();
    imgForm.append("file", file);
    imgForm.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await axios.post(CLOUDINARY_URL, imgForm);
      const imgURL = res.data.secure_url;
      form.setValue("img", imgURL);
    } catch (error) {
      console.log("Upload Error", error);
    }
  };

  function onSubmit(values: z.infer<typeof validationSchema>) {
    dispatch(addMemoryThunk(values));
  }
  const isOpen =
    !!memoryToEdit ||
    formData.title ||
    formData.desc ||
    formData.img ||
    formData.local;
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
          <Button type="submit">add memory</Button>
        </form>
      </Form>
    </div>
  );
};
// {
//   "asset_id": "16ea87f67e7e2baf069b421d99c2a9d4",
//   "public_id": "iqkurldet2mms7tw4ewx",
//   "version": 1746167152,
//   "version_id": "5666e87e9b99007ac0ff724e203bb5c9",
//   "signature": "6b6ed398acb3081f3a9ff5b49a06b6d08c63501e",
//   "width": 300,
//   "height": 168,
//   "format": "png",
//   "resource_type": "image",
//   "created_at": "2025-05-02T06:25:52Z",
//   "tags": [],
//   "bytes": 3787,
//   "type": "upload",
//   "etag": "d1889371e024c968c2af9b47100d7c1d",
//   "placeholder": false,
//   "url": "http://res.cloudinary.com/dexfy4ite/image/upload/v1746167152/iqkurldet2mms7tw4ewx.png",
//   "secure_url": "https://res.cloudinary.com/dexfy4ite/image/upload/v1746167152/iqkurldet2mms7tw4ewx.png",
//   "asset_folder": "",
//   "display_name": "image1",
//   "original_filename": "image1"
// }
