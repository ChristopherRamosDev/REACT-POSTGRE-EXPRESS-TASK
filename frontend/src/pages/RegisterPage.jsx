import { Button, Card, Input, Label } from "./components/ui/index.js";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUp, errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (dataSend) => {
    const user = await signUp(dataSend);
    if (user) {
      navigate("/profile");
    }
  });
  return (
    <div className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card>
        {registerErrors &&
          registerErrors.map((err) => (
            <p className="bg-red-500 text-white p-2 text-center">{err}</p>
          ))}
        <h3 className="text-2xl font-bold">Register</h3>
        <form onSubmit={onSubmit}>
          <div className="mt-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name", { required: true })}
              placeholder="Full name"
            />
          </div>
          {errors.name && (
            <p className="text-red-500">El nombre es requerido</p>
          )}
          <div className="mt-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
            />
          </div>
          {errors.email && (
            <p className="text-red-500">El email es requerido</p>
          )}
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
            />
          </div>
          {errors.password && (
            <p className="text-red-500">El password es requerido</p>
          )}
          <Button type="submit"> Register</Button>
          <div className="flex justify-between my-4">
            <p>
              I have an account <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;
