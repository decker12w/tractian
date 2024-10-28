import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { FaIndustry } from "react-icons/fa";

export default function ServiceOrderForm() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center gap-8 py-8">
      <FaIndustry className="absolute top-6 left-6" size={50} />

      <div className="w-full flex items-center justify-center gap-12">
        <div className="bg-background text-white py-10 px-24 rounded-3xl ">
          <div className="w-[300px] flex flex-col gap-2.5 items-center">
            <div className="text-4xl font-bold mb-3 text-center">
              Escolha a forma de envio
            </div>
            <div className="flex flex-col gap-0.5 mt-5">
              <Button
                variant="primary"
                size="big"
                type="submit"
                onClick={() => navigate("/order-text")}
              >
                Enviar por texto
              </Button>
              <div className="text-center">ou</div>
              <Button
                variant="primary"
                size="big"
                type="submit"
                onClick={() => navigate("/order-audio")}
              >
                Enviar por Aúdio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
