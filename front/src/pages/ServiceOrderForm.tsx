import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/Button";
import Input from "../components/Input";
import { FaIndustry } from "react-icons/fa";
import {
  ServiceOrderFormDTO,
  ServiceOrderFormSchema,
} from "../utils/schemas/serviceOrder";
import Dropdown from "../components/Dropdown";
import { OrderType } from "../utils/types";

export default function ServiceOrderForm() {
  const navigate = useNavigate();

  const orderTypes = [
    { id: OrderType.PREDITIVA, type: "Preditiva" },
    { id: OrderType.PREVENTIVA, type: "Preventiva" },
    { id: OrderType.CORRETIVA, type: "Corretiva" },
    { id: OrderType.INSPECAO, type: "Inspeção" },
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ServiceOrderFormDTO>({
    resolver: zodResolver(ServiceOrderFormSchema),
    mode: "all",
  });

  const onSubmit = (data: ServiceOrderFormDTO) => {
    console.log("Dados enviados:", data);
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
            <div className="text-4xl font-bold mb-3 text-center">
              Formulário ordem de Serviço (Texto)
            </div>
            <Input
              label="Título"
              placeholder="Digite seu título"
              type="text"
              id="title"
              register={register}
              name="title"
              errors={errors.title}
            />
            <Input
              label="Descrição"
              placeholder="Digite sua descrição"
              type="text"
              id="description"
              register={register}
              name="description" // Corrigido
              errors={errors.description} // Corrigido
            />
            <Input
              label="Nome da máquina"
              placeholder="Digite o nome da máquina"
              type="text"
              id="machineName"
              register={register}
              name="machineName"
              errors={errors.machineName} // Corrigido
            />
            <Controller
              name="orderType"
              control={control}
              render={({ field }) => (
                <Dropdown
                  name={field.name}
                  options={orderTypes.map((orderType) => ({
                    value: orderType.id,
                    name: orderType.type,
                  }))}
                  placeholder="Selecione uma Role"
                  errors={errors.orderType}
                  value={field.value}
                  onSelect={(value) => field.onChange(value)}
                />
              )}
            />
            <div className="flex flex-col gap-0.5 mt-5">
              <Button variant="primary" size="big" type="submit">
                Enviar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
