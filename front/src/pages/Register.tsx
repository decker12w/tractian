import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { FaIndustry } from "react-icons/fa";
import { RegisterDTO, RegisterSchema } from "../utils/schemas/auth";
import Dropdown from "../components/Dropdown";
import { Roles } from "../utils/types";

const roles = [
  { id: Roles.TECHNICAL, type: "Technical" },
  { id: Roles.PLANNER, type: "Planner" },
];

export default function Register() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDTO>({
    resolver: zodResolver(RegisterSchema),
    mode: "all",
  });

  const onSubmit = (data: RegisterDTO) => {
    console.log(data);
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
              errors={errors.username || loginError}
            />

            <Input
              label="Senha"
              placeholder="*********"
              type="password"
              id="password"
              register={register}
              name="password"
              errors={errors.password || loginError}
            />

            <Input
              label="Fullname"
              placeholder="Digite seu Nome Completo"
              type="text"
              id="fullname"
              register={register}
              name="fullname"
              errors={errors.fullname || loginError}
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
                  errors={errors.role}
                  value={field.value}
                  onSelect={(value) => field.onChange(value)}
                />
              )}
            />

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
}
