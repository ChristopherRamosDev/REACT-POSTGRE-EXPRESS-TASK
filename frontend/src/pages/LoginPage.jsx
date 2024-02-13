import React from "react";
import { Card, Input, Button, Label } from "./components/ui";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, errors: loginErrors, isAuth } = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (dataSend) => {
    const user = await signIn(dataSend);
    if (user) {
      navigate("/profile");
    }
  
  });
  return (
    <div className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card>
        {loginErrors &&
          loginErrors.map((err) => (
            <p className="bg-red-500 text-white p-2 text-center">{err}</p>
          ))}
        <h1 className="text-4xl font-bold my-2 text-center">Sign In</h1>
        <form onSubmit={onSubmit}>
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email", { required: true })}
            type="email"
            id="email"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500">El email es requerido</p>
          )}
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password", { required: true })}
            type="password"
            id="password"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">La clave es requerida</p>
          )}
          <Button>Sign In</Button>
          <div className="flex justify-between my-4">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
