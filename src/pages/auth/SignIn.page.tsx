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
import { APIGetMyData, APILogin } from "../../api/auth.ts";
import { notify } from "../../utils/helper/notification.helper.tsx";
import { useApi } from "../../plugins/useAPI.tsx";

interface ILoginForm {
  username?: string;
  password?: string;
  [key: string]: string | undefined;
}

const useSignInData = () => {
  const navigate = useNavigate();
  const setTokenDetails = useAuthStore((state) => state.setTokenDetails);
  const setUser = useAuthStore((state) => state.setUser);

  const form: UseFormReturnType<ILoginForm> = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

const handleSubmit = useCallback(async () => {
  try {
    const formData = new FormData();
    Object.keys(form.values).forEach((key: keyof ILoginForm) => {
      formData.append(key, form.values[key] || "");
    });

    const res = await APILogin(formData);

    if (res.code !== "SUCCESS") {
      notify.error(res.message || "Login failed!");
      return;
    }

    // Set tokens
    setTokenDetails(res.data);

    // ONLY check is_verified if the field exists
    if ('is_verified' in res.data && !res.data.is_verified) {
      notify.success("Please verify your account.");
      navigate("/auth/otp", { state: { username: form.values.username } });
      return;
    }

    // Get user data
    const res2 = await APIGetMyData();
    setUser(res2.data);

    notify.success("Login successful!");
    navigate("/dashboard");
  } catch (e: any) {
    console.error(e);
    notify.error(e.message || "Something went wrong during login!");
  }
}, [form.values, navigate]);


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
            <Link to="/auth/forgot-password" className="text-sm hover:underline">
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
              <Link to="/auth/signup" className="hover:underline">
                Sign up
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
