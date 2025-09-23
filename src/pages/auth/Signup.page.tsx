import {
  Button,
  Card,
  PasswordInput,
  Title,
  Text,
  TextInput,
  Checkbox,
  Loader,
} from "@mantine/core";
import { useForm, type UseFormReturnType } from "@mantine/form";
import { useCallback, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckIcon, XIcon } from "lucide-react";
import { APISignUp, ValidateUserNameEmail } from "../../api/auth";
import { notify } from "../../utils/helper/notification.helper";

interface ISignupForm {
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

const useSignUpData = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [validationLoading, setValidationLoading] = useState({
    isLoading: false,
    item: "",
  });
  const [emailValid, setEmailValid] = useState<boolean | null>(null);

  const emailTimeoutRef = useRef<number | null>(null);

  const form: UseFormReturnType<ISignupForm> = useForm<ISignupForm>({
    initialValues: {
      first_name: "",
      last_name: "",
      middle_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validate: {
      first_name: (value) =>
        value.trim().length < 1 ? "First name is required" : null,
      last_name: (value) =>
        value.trim().length < 1 ? "Last name is required" : null,
      email: (value) => {
        if (!/^\S+@\S+$/.test(value)) return "Invalid email";
        if (emailValid === false) return "Email already exists";
        return null;
      },
      password: (value) => {
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/(?=.*[0-9])/.test(value))
          return "Password must contain at least one number";
        if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(value))
          return "Password must contain at least one special character";
        return null;
      },
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
      terms: (value) =>
        value ? null : "You must accept the terms and conditions",
    },
  });

  const [emailApiError, setEmailApiError] = useState<string | null>(null);

  const validateEmail = useCallback((email: string) => {
    if (emailTimeoutRef.current) clearTimeout(emailTimeoutRef.current);

    setEmailValid(null);
    setEmailApiError(null);

    if (email.includes("@")) {
      emailTimeoutRef.current = window.setTimeout(async () => {
        setValidationLoading({ isLoading: true, item: "email" });

        try {
          const response = await ValidateUserNameEmail({ email });

          if (response.code === "SUCCESS") {
            setEmailValid(true);
            setEmailApiError(null);
          } else if (response.code === "BAD_REQUEST") {
            setEmailValid(false);
            setEmailApiError(response.message || "Email already exists.");
          }
        } catch {
          setEmailValid(null);
          setEmailApiError("Email already exists.");
        } finally {
          setValidationLoading({ isLoading: false, item: "" });
        }
      }, 500);
    }
  }, []);

  console.log("emailApiError", emailApiError);
  const handleSubmit = useCallback(
    async (values: ISignupForm) => {
      setLoading(true);

      try {
        const payload = {
          email: values.email,
          first_name: values.first_name,
          last_name: values.last_name,
          middle_name: values.middle_name,
          password: values.password,
        };

        const res = await APISignUp(payload);

        if (res.code === "SUCCESS") {
          notify.success("Account created successfully!");
          navigate("/");
        } else {
          const message = res.message || "Signup failed. Please try again.";
          notify.error(message);
        }
      } catch (err) {
        console.error(err);
        notify.error("Signup failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  useEffect(() => {
    return () => {
      if (emailTimeoutRef.current) clearTimeout(emailTimeoutRef.current);
    };
  }, []);

  return {
    handleSubmit,
    form,
    loading,
    validationLoading,
    validateEmail,
    emailValid,
    emailApiError,
  };
};

export const SignupPage = () => {
  const {
    handleSubmit,
    form,
    loading,
    validationLoading,
    validateEmail,
    emailValid,
    emailApiError,
  } = useSignUpData();

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
            onSubmit={form.onSubmit((values) => handleSubmit(values))}
          >
            <TextInput
              label="First Name"
              placeholder="Enter your first name"
              required
              {...form.getInputProps("first_name")}
            />

            <div className="flex gap-4">
              <TextInput
                label="Middle Name"
                placeholder="Enter your middle name"
                className="flex-1"
                {...form.getInputProps("middle_name")}
              />
              <TextInput
                label="Last Name"
                placeholder="Enter your last name"
                required
                className="flex-1"
                {...form.getInputProps("last_name")}
              />
            </div>
            <TextInput
              label="Email"
              placeholder="Enter your email"
              type="email"
              required
              description="We'll check if this email is available"
              value={form.values.email}
              onChange={(e) => {
                const val = e.currentTarget.value;
                form.setFieldValue("email", val);
                validateEmail(val);
              }}
              rightSection={
                validationLoading.item === "email" ? (
                  <Loader size="xs" />
                ) : emailValid === false ? (
                  <XIcon size={16} className="text-red-500" />
                ) : emailValid === true ? (
                  <CheckIcon size={16} className="text-green-500" />
                ) : null
              }
              error={form.errors.email || emailApiError}
            />
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              required
              description="Must be at least 8 characters with a number and special character"
              {...form.getInputProps("password")}
            />

            <PasswordInput
              label="Confirm Password"
              placeholder="Re-enter your password"
              required
              {...form.getInputProps("confirmPassword")}
            />

            <Checkbox
              label={
                <span>
                  I agree to the{" "}
                  <Link to="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              }
              {...form.getInputProps("terms", { type: "checkbox" })}
              error={form.errors.terms}
            />

            <Button
              type="submit"
              fullWidth
              size="md"
              radius="md"
              color="dark"
              loading={loading}
            >
              Sign Up
            </Button>
          </form>
        </Card.Section>

        <Card.Section inheritPadding py="sm">
          <Text ta="center" size="sm" color="dimmed">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </Text>
        </Card.Section>
      </Card>
    </div>
  );
};
