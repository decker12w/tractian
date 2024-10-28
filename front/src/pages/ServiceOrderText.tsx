import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/Button";
import { FaIndustry } from "react-icons/fa";
import {
  ServiceOrderDTO,
  ServiceOrderSchema,
} from "../utils/schemas/serviceOrder";
import { submitServiceOrder } from "../utils/api/order";

export default function ServiceOrderText() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ServiceOrderDTO>({
    resolver: zodResolver(ServiceOrderSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ServiceOrderDTO) => {
    setSubmitError(null);
    setResult(null);
    try {
      const response = await submitServiceOrder(data);
      setResult(response.result);
      navigate("/order-create");
    } catch (error: any) {
      console.error("Erro ao enviar a ordem de serviço:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setSubmitError(error.response.data.message);
      } else {
        setSubmitError(
          "Ocorreu um erro ao enviar a ordem de serviço. Tente novamente."
        );
      }
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
          <div className="flex flex-col gap-4">
            <div className="text-4xl font-bold mb-3 text-center">
              Formulário Ordem de Serviço (Texto)
            </div>

            {/* Campo de Texto (Textarea) */}
            <div className="flex flex-col gap-1">
              <label htmlFor="text" className="text-lg">
                Texto:
              </label>
              <textarea
                id="text"
                placeholder="Digite o texto aqui..."
                {...register("text")}
                className={`p-2 rounded bg-white text-black ${
                  errors.text ? "border-red-500" : "border-gray-300"
                }`}
                rows={5}
              />
              {errors.text && (
                <span className="text-red-500 text-sm">
                  {errors.text.message}
                </span>
              )}
            </div>

            {/* Exibir Resultado */}
            {result && (
              <div className="bg-gray-800 p-4 rounded">
                <h3 className="text-lg font-semibold">Resultado:</h3>
                <p>{result}</p>
              </div>
            )}

            {/* Exibir Erro Geral */}
            {submitError && (
              <span className="text-red-500 text-sm">{submitError}</span>
            )}

            {/* Botões */}
            <div className="flex flex-col gap-2 mt-5">
              <Button
                variant="primary"
                size="big"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </Button>
              <Button
                variant="secondary"
                type="button"
                size="big"
                onClick={() => navigate("/home")}
              >
                Voltar ao Home
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
