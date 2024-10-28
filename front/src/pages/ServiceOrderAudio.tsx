import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/Button";
import { FaIndustry } from "react-icons/fa";
import {
  ServiceOrderDTO,
  ServiceOrderSchema,
} from "../utils/schemas/serviceOrder";
import { useState, useRef } from "react";
import { submitServiceOrder } from "../utils/api/order";

export default function ServiceOrderAudio() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ServiceOrderDTO>({
    resolver: zodResolver(ServiceOrderSchema),
    mode: "all",
  });

  const [recordingStatus, setRecordingStatus] = useState<
    "inactive" | "recording"
  >("inactive");
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [permission, setPermission] = useState(false);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
      } catch (err) {
        alert("Erro ao acessar o microfone: " + err);
      }
    } else {
      alert("A API MediaRecorder não é suportada no seu navegador.");
    }
  };

  const startRecording = async () => {
    if (!permission) {
      await getMicrophonePermission();
      if (!permission) return;
    }

    setRecordingStatus("recording");
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);
      setValue("recordedAudio", audioBlob, { shouldValidate: true });
    };

    mediaRecorder.start();
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecordingStatus("inactive");
    }
  };

  const onSubmit = async (data: ServiceOrderDTO) => {
    console.log("Dados enviados:", data);

    try {
      const response = await submitServiceOrder(data);
      console.log("Resultado:", response);
      // Trate o resultado aqui
    } catch (error) {
      console.error("Erro ao enviar a ordem de serviço:", error);
      // Trate o erro aqui
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
            <div className="text-4xl font-bold mb-3 text-center">
              Formulário Ordem de Serviço (Áudio)
            </div>

            {/* Input para Upload de Áudio */}
            <div className="flex flex-col gap-2.5 mt-5 w-full">
              <label htmlFor="audioUpload" className="text-lg">
                Carregar Áudio:
              </label>
              <input
                type="file"
                id="audioUpload"
                accept="audio/*"
                {...register("audioUpload")}
                className="border p-2 rounded bg-white text-black"
              />
              {errors.audioUpload && (
                <span className="text-red-500">
                  {errors.audioUpload.message as string}
                </span>
              )}
            </div>

            {/* Gravação de Áudio */}
            <div className="flex flex-col gap-2.5 mt-5 w-full">
              <label className="text-lg">Gravar Áudio:</label>
              {audioURL && (
                <audio controls src={audioURL} className="mb-2 mt-2" />
              )}
              <div className="flex gap-4">
                {recordingStatus === "inactive" ? (
                  <button
                    type="button"
                    onClick={startRecording}
                    className="bg-green-500 px-4 py-2 rounded"
                  >
                    Iniciar Gravação
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="bg-red-500 px-4 py-2 rounded"
                  >
                    Parar Gravação
                  </button>
                )}
              </div>
              {errors.recordedAudio && (
                <span className="text-red-500">
                  {errors.recordedAudio.message as string}
                </span>
              )}
              {audioURL && (
                <div className="audio-container mt-2">
                  <a download href={audioURL} className="text-blue-400">
                    Baixar Gravação
                  </a>
                </div>
              )}
            </div>

            {/* Botões */}
            <div className="flex flex-col gap-0.5 mt-5 w-full">
              <Button variant="primary" size="big" type="submit">
                Enviar
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
