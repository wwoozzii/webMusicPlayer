import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterFormData,
} from "../../schemas/authSchema";

export const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const onSubmit = (data: RegisterFormData) => {
    console.log("Данные регистрации:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <input
          id="email"
          type="email"
          {...register("email")}
          placeholder="Email"
        />
        {errors.email && (
          <span style={{ display: "block" }}>{errors.email.message}</span>
        )}
      </div>

      <div>
        <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? "hide" : "show"}
        </button>

        <input
          id="password"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          placeholder="Password"
        />
        {errors.password && (
          <span style={{ display: "block" }}>{errors.password.message}</span>
        )}
      </div>

      <div>
        <button
          type="button"
          onClick={() => setShowConfirmPassword((prev) => !prev)}
        >
          {showConfirmPassword ? "show" : "hide"}
        </button>
        <input
          id="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          {...register("confirmPassword")}
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && (
          <span style={{ display: "block" }}>
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        Зарегистрироваться
      </button>
    </form>
  );
};
