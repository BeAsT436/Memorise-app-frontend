import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addMemoryThunk } from "@/redux/memorySlice";
import axios from "axios";

const validationSchema = z.object({
  title: z
    .string()
    .min(5, { message: "min lenght 5 symbols" })
    .max(50, { message: "max lenght 50 symbols" }),
  desc: z
    .string()
    .min(10, { message: "min lenght 10 symbols" })
    .max(200, { message: "max lenght 200 symbols" }),
  img: z.string(),
});

const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;
const UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_URL;

export const MemoryForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: "",
      desc: "",
      img: "",
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imgForm = new FormData();
    imgForm.append("file", file);
    imgForm.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await axios.post(UPLOAD_URL, imgForm);
      const imgURL = res.data.secure_url;
      form.setValue("img", imgURL);
    } catch (error) {
      console.log("Upload Error", error);
    }
  };

  function onSubmit(values: z.infer<typeof validationSchema>) {
    dispatch(addMemoryThunk(values));
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
          {/* <FormField
            name="img"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Img</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          /> */}
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
