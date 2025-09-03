import { Button, Card, Title, Text } from "@mantine/core";
import { CheckCircle } from "lucide-react";

export const ResetConfirmationPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card
        shadow="md"
        radius="lg"
        padding="xl"
        className="w-[420px] text-center"
      >
        <Card.Section inheritPadding py="md">
          <div className="flex justify-center mb-4">
            <CheckCircle className="text-green-600 w-16 h-16" />
          </div>
          <Title
            order={2}
            ta="center"
            className="text-2xl font-bold text-gray-800"
          >
            Password Reset Successful
          </Title>
          <Text ta="center" size="sm" color="dimmed" className="mt-2">
            Your password has been updated. You can now log in with your new
            password.
          </Text>
        </Card.Section>

        <Card.Section inheritPadding py="lg">
          <Button
            color="blue"
            fullWidth
            size="md"
            radius="md"
            component="a"
            href="/"
          >
            Go to Sign In
          </Button>
        </Card.Section>
      </Card>
    </div>
  );
};
