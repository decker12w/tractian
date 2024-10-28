// src/pages/CreateOrderForm.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/Button";
import Input from "../components/Input";
import { FaIndustry } from "react-icons/fa";
import {
  ServiceOrderFormDTO,
  CreateOrderFormSchema,
} from "../utils/schemas/serviceOrder";
import Dropdown from "../components/Dropdown";
import { OrderType } from "../utils/types";
import { useAnalyzerContext } from "../context/AnalyserContext";
import { api } from "../utils/api/api";
import { useAuth } from "../hooks/useAuth";

export default function ServiceOrderForm() {
  const { token } = useAuth()
  const navigate = useNavigate();
  const { response, clearResponse } = useAnalyzerContext(); // Acesso ao contexto

  const orderTypes = [
    { id: OrderType.PREDITIVA, type: "Preditiva" },
    { id: OrderType.PREVENTIVA, type: "Preventiva" },
    { id: OrderType.CORRETIVA, type: "Corretiva" },
    { id: OrderType.INSPECAO, type: "Inspeção" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ServiceOrderFormDTO[]>([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ServiceOrderFormDTO>({
    resolver: zodResolver(CreateOrderFormSchema),
    mode: "all",
    defaultValues: {
      title: "",
      description: "",
      machineName: "",
      orderType: OrderType.PREDITIVA, // Valor padrão
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para gerenciamento do envio

  useEffect(() => {
    if (response && response.analysisResult.length > 0) {
      // Mapeando 'type' para 'orderType'
      const mappedData: ServiceOrderFormDTO[] = response.analysisResult.map(
        (item) => ({
          title: item.title,
          description: item.description,
          machineName: item.machineName,
          orderType: item.type, // Mapeando 'type' para 'orderType'
        })
      );

      // Inicializa formData com os resultados mapeados
      setFormData(mappedData);

      // Define os valores iniciais para o primeiro passo
      const firstResult = mappedData[0];
      setValue("title", firstResult.title);
      setValue("description", firstResult.description);
      setValue("machineName", firstResult.machineName);
      setValue("orderType", firstResult.orderType);
    }
  }, [response, setValue]);

  /*  useEffect(() => {
    if (!response) {
      navigate("/order-audio"); // Redireciona se não houver resposta
    }
  }, [response, navigate]); */

  const onSubmit = async (data: ServiceOrderFormDTO) => {
    // Atualiza formData com os dados do passo atual
    const updatedFormData = [...formData];
    updatedFormData[currentStep] = data;
    setFormData(updatedFormData);

    if (currentStep < formData.length - 1) {
      // Se não for o último passo, avança para o próximo
      setCurrentStep(currentStep + 1);
      // Define os valores para o próximo passo
      const nextResult = updatedFormData[currentStep + 1];
      setValue("title", nextResult.title);
      setValue("description", nextResult.description);
      setValue("machineName", nextResult.machineName);
      setValue("orderType", nextResult.orderType);
    } else {
      // Último passo, envia os dados
      setIsSubmitting(true); // Inicia o carregamento
      try {
        const responses = await Promise.all(
          updatedFormData.map((order) =>
            api.post("/orders", {...order, type: order.orderType, technicalId: 'b84e46b4-f882-43a8-b007-f7e634be8200'}, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
          )
        );
        console.log("Dados enviados com sucesso:", responses);
        // Limpa o contexto e navega para home
        clearResponse();
        navigate("/home");
      } catch (error: any) {
        console.error("Erro ao enviar a ordem de serviço:", error);
        // Trate o erro aqui, por exemplo, mostrar uma mensagem de erro
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          alert(error.response.data.message);
        } else {
          alert(
            "Ocorreu um erro ao enviar a ordem de serviço. Tente novamente."
          );
        }
      } finally {
        setIsSubmitting(false); // Finaliza o carregamento
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      const prevResult = formData[currentStep - 1];
      setValue("title", prevResult.title);
      setValue("description", prevResult.description);
      setValue("machineName", prevResult.machineName);
      setValue("orderType", prevResult.orderType);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center gap-8 py-8">
      <FaIndustry className="absolute top-6 left-6" size={50} />

      <div className="w-full flex items-center justify-center gap-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-black text-white py-10 px-24 rounded-3xl w-full max-w-md"
        >
          <div className="w-[300px] flex flex-col gap-2.5 items-center">
            <div className="text-4xl font-bold mb-3 text-center">
              Formulário Criação de Ordem
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
              name="description"
              errors={errors.description}
            />
            <Input
              label="Nome da Máquina"
              placeholder="Digite o nome da máquina"
              type="text"
              id="machineName"
              register={register}
              name="machineName"
              errors={errors.machineName}
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
                  placeholder="Selecione um Tipo de Ordem"
                  errors={errors.orderType}
                  value={field.value}
                  onSelect={(value) => field.onChange(value)}
                />
              )}
            />
            <div className="flex flex-row gap-4 mt-5 w-full">
              {currentStep > 0 && (
                <Button
                  variant="secondary"
                  size="big"
                  type="button"
                  onClick={handlePrevious}
                >
                  Voltar
                </Button>
              )}
              <Button
                variant="primary"
                size="big"
                type="submit"
                disabled={isSubmitting} // Desabilita durante o envio
              >
                {currentStep < formData.length - 1
                  ? "Avançar"
                  : isSubmitting
                  ? "Enviando..."
                  : "Enviar"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
