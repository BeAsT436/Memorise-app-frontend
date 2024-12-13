import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"

const loginSchema = z.object({
    username: z.string().min(3, {message:"username must be at least 3 characters"})
})

type Props = { isLogin: boolean };
export const AuthForm = ({ isLogin }: Props) => {
    const schema = loginSchema 
    const form = useForm<z.infer<typeof schema>>({
        resolver:zodResolver(schema),
        defaultValues:{
            username:""

        }
    })
    function onSubmit(values:z.infer<typeof schema>){
        console.log(values);
        
    }
  return (
    <div>
      <div>
        <h1>{!isLogin ? "Create your account" : "Login to your account"}</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="username"
            control={form.control}
            render={(field) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">{!isLogin ? "Sing Up":"Log in"}</Button>
        </form>
      </Form>
    </div>
  );
};
