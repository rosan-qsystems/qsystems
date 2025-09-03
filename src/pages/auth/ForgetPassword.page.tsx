import { Button, Card, Input, Title, Text } from "@mantine/core";

export const ForgotPasswordPage = () => {
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
            Enter your email to reset your password
          </Text>
        </Card.Section>

        <Card.Section inheritPadding py="lg">
          <form className="grid gap-6">
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
              />
            </div>

            <Button type="submit" color="blue" fullWidth size="md" radius="md">
              Send Reset Link
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
