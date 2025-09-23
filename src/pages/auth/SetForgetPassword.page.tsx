import {
  Button,
  Card,
  PasswordInput,
  TextInput,
  Title,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ResetForgetPassword } from "../../api/auth";
import { useLocation, useNavigate } from "react-router";
import { notify } from "../../utils/helper/notification.helper";

const useResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const form = useForm({
    initialValues: {
      email,
      confirmation_code: "",
      new_password: "",
      confirmPassword: "",
    },
    validate: {
      confirmation_code: (value) => (value ? null : "Code required"),
      new_password: (value) => {
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/(?=.*[0-9])/.test(value))
          return "Password must contain at least one number";
        if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?])/.test(value))
          return "Password must contain at least one special character";
        return null;
      },
      confirmPassword: (value, values) =>
        value !== values.new_password ? "Passwords do not match" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const res = await ResetForgetPassword({
        email: values.email,
        confirmation_code: values.confirmation_code,
        new_password: values.new_password,
      });

      if (res.code === "SUCCESS") {
        notify.success(res.message || "Password reset successful");
        navigate("/");
      } else {
        notify.error(res.message || "Password reset failed");
      }
    } catch (error: any) {
      console.error("Reset password failed:", error);
      notify.error(
        error.message || "Something went wrong while resetting password"
      );
    }
  };

  return { form, handleSubmit };
};

export default useResetPassword;

export const ResetForgetPasswordPage = () => {
  const { form, handleSubmit } = useResetPassword();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card shadow="md" radius="lg" padding="xl" className="w-[420px]">
        <Card.Section inheritPadding py="md">
          <Title
            order={2}
            ta="center"
            className="text-3xl font-bold text-gray-800"
          >
            Reset Password
          </Title>
          <Text ta="center" size="sm" color="dimmed" className="mt-1">
            Choose a new password for your account
          </Text>
        </Card.Section>

        <Card.Section inheritPadding py="lg">
          <form className="grid gap-6" onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Email"
              placeholder="Enter your email"
              type="email"
              size="md"
              radius="md"
              required
              {...form.getInputProps("email")}
            />

            <TextInput
              label="Verification Code"
              placeholder="Enter your code"
              size="md"
              radius="md"
              required
              {...form.getInputProps("confirmation_code")}
            />

            <PasswordInput
              label="New Password"
              placeholder="Enter new password"
              size="md"
              radius="md"
              required
              {...form.getInputProps("new_password")}
            />

            <PasswordInput
              label="Confirm Password"
              placeholder="Re-enter new password"
              size="md"
              radius="md"
              required
              {...form.getInputProps("confirmPassword")}
            />

            <Button type="submit" color="blue" fullWidth size="md" radius="md">
              Update Password
            </Button>
          </form>
        </Card.Section>

        <Card.Section inheritPadding py="sm">
          <Text ta="center" size="sm" color="dimmed">
            Back to{" "}
            <a href="/" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </Text>
        </Card.Section>
      </Card>
    </div>
  );
};
