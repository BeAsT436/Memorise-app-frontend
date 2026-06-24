import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginUser, registerUser} from "@/redux/authSlice";

const loginSchema = z.object({
  email: z
    .string()
    .min(3, { message: "very small email" })
    .email("email is wrong"),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 characters" }),
});

const registerSchema = loginSchema
  .extend({
    name: z
      .string()
      .min(3, { message: "username must be at least 3 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "password must be at least 8 characters" }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "password must match",
    path: ["confirmPassword"],
  });

type Props = { isLogin: boolean };

export const AuthForm = ({ isLogin }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = isLogin ? loginSchema : registerSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    if (!isLogin) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...rest } = values as z.infer<
        typeof registerSchema
      >;
      // register
      // todo type
      dispatch(registerUser(rest))
    }else{
      // login
      // todo type
      dispatch(loginUser(values))
    }
    form.reset()
    
    
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
      <div>
        <h1>{!isLogin ? "Create your account" : "Login to your account"}</h1>
      </div>

      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          {!isLogin && (
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="examlpe@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!isLogin && (
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="confirm your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button className="mt-5" type="submit">
            {isLogin ? "Log in" : "Sing Up"}
          </Button>
        </form>
      </Form>

      <div>
        <p>{isLogin ? "already have an account?" : "dont have an account?"}</p>
        <Button
          onClick={() => navigate(isLogin ? "/register" : "/login")}
          variant={"link"}
        >
          {isLogin ? "register" : "login"}
        </Button>
      </div>
    </div>
  );
};
