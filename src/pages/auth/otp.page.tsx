import { useState, useRef } from "react";
import {
  Button,
  Card,
  Title,
  Group,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { ConfirmSignUp, ResendConfirmationCode } from "../../api/auth";
import { notify } from "../../utils/helper/notification.helper";

const useOTP = (length: number = 6) => {
  const location = useLocation();
  const {
    username,
    //  email, prevRoute, password
  } = location.state || {};

  const [otp, setOtp] = useState(Array(length).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (paste.length === 6) {
      const newOtp = paste.split("");
      setOtp(newOtp);
      setTimeout(() => {
        inputsRef.current[5]?.focus();
      }, 0);
    }
  };

  const handleVerify = async () => {
    if (!username) {
      notify.error("Username not found. Please try again.");
      return;
    }

    const confirmation_code = otp.join("");
    if (confirmation_code.length !== 6) {
      notify.error("Please enter a valid 6-digit code");
      return;
    }

    setLoading(true);
    try {
      const res = await ConfirmSignUp({ username, confirmation_code });

      if (res.code === "SUCCESS") {
        navigate("/dashboard");
        notify.success("Account verified and logged in!");
      } else {
        notify.error(res.message || "Verification failed");
      }
    } catch (error: any) {
      notify.error(error.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!username) {
      notify.error("Username not found. Please try again.");
      return;
    }

    setResendLoading(true);
    try {
      const res = await ResendConfirmationCode({ username });

      if (res.code === "SUCCESS") {
        notify.success("Verification code sent successfully!");
        setOtp(Array(6).fill(""));
        hiddenInputRef.current?.focus();
      } else {
        notify.error(res.message || "Failed to resend code");
      }
    } catch (error: any) {
      notify.error(error.message || "Failed to resend code");
    } finally {
      setResendLoading(false);
    }
  };

  return {
    otp,
    username,
    loading,
    resendLoading,
    inputsRef,
    hiddenInputRef,
    handleChange,
    handleKeyDown,
    handlePaste,
    handleVerify,
    setOtp,
    handleResend,
  };
};

export const OTPPage = () => {
  const {
    otp,
    setOtp,
    username,
    loading,
    resendLoading,
    inputsRef,
    hiddenInputRef,
    handleChange,
    handleKeyDown,
    handlePaste,
    handleVerify,
    handleResend,
  } = useOTP(6);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card shadow="md" radius="lg" padding="xl" className="w-[420px] relative">
        <LoadingOverlay visible={loading} />

        <Card.Section inheritPadding py="md">
          <Title
            order={2}
            ta="center"
            className="text-3xl font-bold text-gray-800"
          >
            Enter Verification Code
          </Title>
          {username && (
            <Text ta="center" size="sm" color="dimmed" mt="sm">
              Sent to {username}
            </Text>
          )}
        </Card.Section>

        <Card.Section inheritPadding py="lg">
          <div className="flex justify-center gap-2 relative">
            <input
              ref={hiddenInputRef}
              type="text"
              value={otp.join("")}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "").slice(0, 6);
                const newOtp = value
                  .split("")
                  .concat(Array(6 - value.length).fill(""));
                setOtp(newOtp);

                const nextIndex = newOtp.findIndex((d) => d === "");
                if (nextIndex !== -1 && nextIndex < inputsRef.current.length) {
                  inputsRef.current[nextIndex]?.focus();
                } else if (inputsRef.current.length > 0) {
                  inputsRef.current[5]?.focus();
                }
              }}
              onPaste={handlePaste}
              className="absolute opacity-0 pointer-events-none"
              style={{ width: 0, height: 0 }}
              autoFocus
            />

            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  if (el) inputsRef.current[index] = el;
                }}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={() => hiddenInputRef.current?.focus()}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-12 text-center text-lg font-bold border-b-2 border-gray-400 focus:border-blue-500 outline-none bg-transparent"
                disabled={loading}
              />
            ))}
          </div>

          <Group mt="lg">
            <Button
              color="gray"
              radius="md"
              onClick={handleResend}
              loading={resendLoading}
              disabled={loading || !username}
            >
              Resend Code
            </Button>
            <Button
              color="blue"
              radius="md"
              onClick={handleVerify}
              loading={loading}
              disabled={!username}
            >
              Verify
            </Button>
          </Group>
        </Card.Section>
      </Card>
    </div>
  );
};
