import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/Button";
import Input from "../components/Input";
import { FaIndustry } from "react-icons/fa";
import { RegisterDTO, RegisterSchema } from "../utils/schemas/auth";
import Dropdown from "../components/Dropdown";
import { Roles } from "../utils/types";
import { registerUser } from "../utils/api/auth";
import { useAuthContext } from "../context/AuthProvider";

const roles = [
  { id: Roles.TECHNICAL, type: "Technical" },
  { id: Roles.PLANNER, type: "Planner" },
];

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState<string | null>(null);
  const { loginUser } = useAuthContext(); // Opcional: para logar o usuário após registro

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDTO>({
    resolver: zodResolver(RegisterSchema),
    mode: "all",
  });

  const onSubmit = async (data: RegisterDTO) => {
    try {
      const response = await registerUser(data); // Chamar a API de registro
      if (response.user) {
        navigate("/login"); // Redireciona para a página de login após registro
      } else {
        setRegisterError("Registro falhou. Tente novamente.");
      }
    } catch (error: any) {
      console.error("Erro no registro:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setRegisterError(error.response.data.message); // Mensagem de erro específica do backend
      } else {
        setRegisterError("Ocorreu um erro ao registrar. Tente novamente.");
      }
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center gap-8 py-8">
      <FaIndustry className="absolute top-6 left-6" size={50} />

      <div className="w-full flex items-center justify-center gap-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-black text-white py-10 px-24 rounded-3xl"
        >
          <div className="w-[300px] flex flex-col gap-2.5 items-center">
            <div className="text-4xl font-bold mb-3 text-center">
              Registro de Usuário
            </div>

            <Input
              label="Username"
              placeholder="Digite seu Username"
              type="text"
              id="username"
              register={register}
              name="username"
              errors={errors.username?.message}
            />

            <Input
              label="Senha"
              placeholder="*********"
              type="password"
              id="password"
              register={register}
              name="password"
              errors={errors.password?.message}
            />

            <Input
              label="Nome Completo"
              placeholder="Digite seu Nome Completo"
              type="text"
              id="fullName"
              register={register}
              name="fullName"
              errors={errors.fullName?.message}
            />

            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Dropdown
                  name={field.name}
                  options={roles.map((role) => ({
                    value: role.id,
                    name: role.type,
                  }))}
                  placeholder="Selecione uma Role"
                  errors={errors.role?.message}
                  value={field.value}
                  onSelect={(value) => field.onChange(value)}
                />
              )}
            />

            {registerError && (
              <span className="text-red-500 text-sm mt-2">{registerError}</span>
            )}

            <div className="flex flex-col gap-0.5 mt-5">
              <Button variant="primary" size="big" type="submit">
                Registrar
              </Button>
              <div className="text-center">ou</div>
              <Button
                variant="secondary"
                type="button"
                size="big"
                onClick={() => navigate("/")}
              >
                Voltar ao Login
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
