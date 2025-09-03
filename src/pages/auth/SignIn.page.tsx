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
import {useAuthStore} from "../../store/modules/auth/auth.store.ts";

interface ILoginForm {
  username: string;
  password: string;
}

const useSignInData = () => {
  const navigate = useNavigate();
  const setLoginData = useAuthStore(state=>state.login);
  const form: UseFormReturnType<ILoginForm> = useForm({
    initialValues: {
      username: "admin@prod.com",
      password: "password",
    },
  });

  const handleSubmit = useCallback(() =>{
      setLoginData(form.values);
      navigate("/dashboard");
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
      className="flex justify-center items-center min-h-screen bg-gray-50"
      onSubmit={form.onSubmit(() => handleSubmit())}
    >
      <Card shadow="md" radius="lg" padding="xl" className="w-[420px]">
        <Card.Section inheritPadding py="md">
          <Title
            order={2}
            ta="center"
            className="text-3xl font-bold text-gray-800"
          >
            LOGO
          </Title>
        </Card.Section>

        <Card.Section inheritPadding py="lg">
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
          <div className={"mb-md"}>
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" color="blue" fullWidth size="md" radius="md">
            Sign In
          </Button>
        </Card.Section>

        <Card.Section inheritPadding py="sm">
          <Text ta="center" size="sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </Text>
        </Card.Section>
      </Card>
    </form>
  );
};
