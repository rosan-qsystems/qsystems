import { Button, Card, Input, Title, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ForgetPassword } from "../../api/auth";
import { useNavigate } from "react-router";
import { notify } from "../../utils/helper/notification.helper";

const useForgotPassword = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { email: "" },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const res = await ForgetPassword(values.email);
      console.log("API Response:", res);
      if (res.code === "SUCCESS") {
      notify.success(res.message);
      navigate("/auth/reset-password", { state: { email: values.email } });
    } else {
      notify.error(res.message || "Something went wrong");
    }
  } catch (error: any) {
    notify.error(error.message || "Failed to send reset code");
    console.error("Forgot password failed:", error);
  }
};

  return { form, handleSubmit };
};

export const ForgotPasswordPage = () => {
  const { form, handleSubmit } = useForgotPassword();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card shadow="md" radius="lg" padding="xl" className="w-[420px]">
        <Card.Section inheritPadding py="md">
          <Title
            order={2}
            ta="center"
            className="text-3xl font-bold text-gray-800"
          >
            Forgot Password
          </Title>
          <Text ta="center" size="sm" color="dimmed" className="mt-1">
            Enter your email address to receive a password reset code.
          </Text>
        </Card.Section>

        <Card.Section inheritPadding py="lg">
          <form className="grid gap-6" onSubmit={form.onSubmit(handleSubmit)}>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                size="md"
                radius="md"
                required
                {...form.getInputProps("email")}
              />
            </div>

            <Button type="submit" color="blue" fullWidth size="md" radius="md">
              Send
            </Button>
          </form>
        </Card.Section>

        <Card.Section inheritPadding py="sm">
          <Text ta="center" size="sm">
            Remembered your password?{" "}
            <a href="/" className="text-blue-600 hover:underline">
              Back to Sign in
            </a>
          </Text>
        </Card.Section>
      </Card>
    </div>
  );
};
