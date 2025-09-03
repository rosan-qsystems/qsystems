import {
  Button,
  Card,
  Input,
  PasswordInput,
  Title,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, type UseFormReturnType } from "@mantine/form";
import { useCallback } from "react";
import { Link, useNavigate } from "react-router";

interface ISignupForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const useSignUpData = () => {
  const navigate = useNavigate();

  const form: UseFormReturnType<ISignupForm> = useForm({
    initialValues: {
      username: "admin",
      email: "admin@prod.com",
      password: "password",
      confirmPassword: "password",
    },
  });

  const handleSubmit = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return {
    handleSubmit,
    form,
  };
};

export const SignupPage = () => {
  const { handleSubmit, form } = useSignUpData();
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card shadow="md" radius="lg" padding="xl" className="w-[420px]">
        <Card.Section inheritPadding py="md">
          <Title
            order={2}
            ta="center"
            className="text-3xl font-bold text-gray-800"
          >
            Create Account
          </Title>
        </Card.Section>

        <Card.Section inheritPadding py="lg">
          <form
            className="grid gap-6"
            onSubmit={form.onSubmit(() => handleSubmit())}
          >
            <div className="flex flex-col gap-2">
              <TextInput
                label={"Username"}
                placeholder="Enter your username"
                type="text"
                size="md"
                radius="md"
                mb={"md"}
                required
                {...form.getInputProps("username")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <TextInput
                label={"Email"}
                placeholder="Enter your email"
                type="email"
                size="md"
                radius="md"
                mb={"md"}
                required
                {...form.getInputProps("email")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <PasswordInput
                label={"Password"}
                placeholder="Enter your password"
                size="md"
                radius="md"
                required
                {...form.getInputProps("password")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <PasswordInput
                label={"Password"}
                placeholder="Enter your password"
                size="md"
                radius="md"
                required
                {...form.getInputProps("password")}
              />
            </div>

            <Button type="submit" color="blue" fullWidth size="md" radius="md">
              Sign Up
            </Button>
          </form>
        </Card.Section>

        <Card.Section inheritPadding py="sm">
          <Text ta="center" size="sm" color="dimmed">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </Text>
        </Card.Section>
      </Card>
    </div>
  );
};
