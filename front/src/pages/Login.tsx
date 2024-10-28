import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { FaIndustry } from "react-icons/fa";
import { LoginDTO, LoginSchema } from "../utils/schemas/auth";
import { login } from "../utils/api/auth";
import { useAuthContext } from "../context/AuthProvider";

export default function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  const { loginUser } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>({
    resolver: zodResolver(LoginSchema),
    mode: "all",
  });

  const onSubmit = async (data: LoginDTO) => {
    try {
      const response = await login(data);
      if (response.accessToken) {
        loginUser(response.accessToken);
        navigate("/home");
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setLoginError(true);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center gap-8 py-8">
      <FaIndustry className="absolute top-6 left-6" size={50} />

      <div className="w-full flex items-center justify-center gap-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-black text-white py-10 px-24 rounded-3xl "
        >
          <div className="w-[300px] flex flex-col gap-2.5 items-center">
            <div className="text-4xl font-bold mb-3 text-center">Login</div>
            <Input
              label="Username"
              placeholder="Digite seu Username"
              type="text"
              id="username"
              register={register}
              name="username"
              errors={
                errors.username || (loginError && "Credenciais inválidas")
              }
            />
            <Input
              label="Senha"
              placeholder="*********"
              type="password"
              id="password"
              register={register}
              name="password"
              errors={
                errors.password || (loginError && "Credenciais inválidas")
              }
            />
            {loginError && (
              <span className="text-red-500">E-mail e/ou senha incorretos</span>
            )}
            <div className="flex flex-col gap-0.5 mt-5">
              <Button variant="primary" size="big" type="submit">
                ENTRAR
              </Button>
              <div className="text-center">ou</div>
              <Button
                variant="secondary"
                type="button"
                size="big"
                onClick={() => navigate("/register")}
              >
                CADASTRE-SE
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
