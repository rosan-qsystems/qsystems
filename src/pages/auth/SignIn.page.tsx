import {
  Button,
  Card,
  PasswordInput,
  Title,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, type UseFormReturnType } from "@mantine/form";
import { Link, useNavigate } from "react-router";
import { useCallback } from "react";
import { useAuthStore } from "../../store/modules/auth/auth.store.ts";
import { Logo } from "../../components/common/Logo.tsx";

interface ILoginForm {
  username: string;
  password: string;
}

const useSignInData = () => {
  const navigate = useNavigate();
  const setLoginData = useAuthStore((state) => state.login);
  const form: UseFormReturnType<ILoginForm> = useForm({
    initialValues: {
      username: "admin@prod.com",
      password: "password",
    },
  });

  const handleSubmit = useCallback(() => {
    setLoginData(form.values);
    navigate("/");
  }, [navigate]);

  return {
    handleSubmit,
    form,
  };
};

export const SignInPage = () => {
  const { handleSubmit, form } = useSignInData();

  return (
    <form
      className="flex justify-center pt-[150px] min-h-screen"
      onSubmit={form.onSubmit(() => handleSubmit())}
    >
      <div className={"w-8/10 space-y-xl"}>
        <div className="flex justify-center">
          <div className="scale-200">
            <Logo />
          </div>
        </div>
        <div>
          <div className={"text-3xl"}>Welcome to qSystems.AI!</div>
          <div className={"text-xl mt-xs"}>
            Enter your credentials to login!
          </div>
        </div>
        <div>
          <TextInput
            label={"Email"}
            placeholder="Enter your email"
            type="email"
            size="md"
            radius="md"
            mb={"md"}
            required
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label={"Password"}
            placeholder="Enter your password"
            size="md"
            radius="md"
            required
            {...form.getInputProps("password")}
          />
          <div className={"mb-md text-right mt-sm"}>
            <Link to="/forgot-password" className="text-sm hover:underline">
              Forgot Password?
            </Link>
          </div>

          <div className={"space-y-sm"}>
            <Button
              type="submit"
              fullWidth
              size="md"
              radius="md"
              color={"dark"}
            >
              Sign In
            </Button>

            <Button ta="center" size="sm" variant={"subtle"} fullWidth>
              Don’t have an account?{" "}
              <Link to="/signup" className="hover:underline">
                Sign up
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
