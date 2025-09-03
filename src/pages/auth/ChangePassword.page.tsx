import { Button, Card, PasswordInput, Title, Text } from "@mantine/core";

export const ResetPasswordPage = () => {
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
          <form className="grid gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="newPassword"
                className="text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <PasswordInput
                id="newPassword"
                placeholder="Enter new password"
                size="md"
                radius="md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <PasswordInput
                id="confirmPassword"
                placeholder="Re-enter new password"
                size="md"
                radius="md"
              />
            </div>

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
