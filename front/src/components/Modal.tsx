import React, { useRef, useEffect, useState, useMemo } from "react";
import ReactDOM from "react-dom";
import Button from "../button";
import {
  BsArrowLeftCircle,
  BsArrowRightCircle,
  BsCashCoin,
  BsHouseDoorFill,
  BsBuilding,
  BsBook,
  BsBoxSeam,
} from "react-icons/bs";
import { Controller, useForm } from "react-hook-form";
import Dropdown from "../dropdown";
import {
  listTables,
  updateTables,
} from "../../utils/api-functions/tables-api-functions";
import { Tables } from "../../utils/types/table-types";
import Input from "../input";
import { AiOutlineShop } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateTablesDTO,
  updateTablesDTOSchema,
} from "../../utils/schemas/table-schemas";
import {
  decimalToPercentage,
  percentageToDecimal,
} from "../../utils/converter";
import { toast, ToastContainer } from "react-toastify";

interface HiringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HiringModal: React.FC<HiringModalProps> = ({ isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [tables, setTables] = useState<Tables[]>([]);
  const [currentStep, setCurrentStep] = useState(1);

  const {
    control,
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<UpdateTablesDTO>({
    resolver: zodResolver(updateTablesDTOSchema),
    mode: "onChange",
  });

  const selectedTableId = watch("id");

  const selectedTable = useMemo(() => {
    return tables.find((t) => t.id === selectedTableId);
  }, [tables, selectedTableId]);

  useEffect(() => {
    async function loadData() {
      try {
        const listAllTables = await listTables();
        console.log("Tabelas recebidas:", listAllTables.tables);
        setTables(listAllTables.tables);
      } catch (error) {
        console.error("Erro ao carregar tabelas:", error);
        setTables([]);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen) {
      dialog?.showModal();
      dialog?.focus();
    } else {
      dialog?.close();
      setCurrentStep(1);
      reset({});
    }
  }, [isOpen, reset]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    setCurrentStep(1);
    reset({
      id: "",
    });
  };

  const backStep = () => {
    setCurrentStep(1);
    reset({
      id: "",
    });
  };

  const handleNext = async () => {
    const valid = await trigger("id");
    if (valid) {
      setCurrentStep(2);
      if (selectedTable) {
        reset({
          id: selectedTable.id,
          fixedCost: selectedTable.fixedCost?.toString() ?? "",
          houseFee: decimalToPercentage(selectedTable.houseFee),
          apartmentFee: decimalToPercentage(selectedTable.apartmentFee),
          consultancySchoolsOfficeFee: decimalToPercentage(
            selectedTable.consultancySchoolsOfficeFee
          ),
          tradeServicesFee: decimalToPercentage(selectedTable.tradeServicesFee),
          industryFee: decimalToPercentage(selectedTable.industryFee),
        });
      }
    }
  };

  const onSubmit = async (data: UpdateTablesDTO) => {
    try {
      const updatedData: Tables = {
        ...data,
        type: selectedTable?.type || "",
        fixedCost: data.fixedCost
          ? parseFloat(data.fixedCost.replace(",", "."))
          : undefined,
        houseFee: percentageToDecimal(data.houseFee),
        apartmentFee: percentageToDecimal(data.apartmentFee),
        consultancySchoolsOfficeFee: percentageToDecimal(
          data.consultancySchoolsOfficeFee
        ),
        tradeServicesFee: percentageToDecimal(data.tradeServicesFee),
        industryFee: percentageToDecimal(data.industryFee),
      };

      await updateTables(updatedData);
      const listAllTables = await listTables();

      setTables(listAllTables.tables);
      toast.success("Tabela atualizada com Sucesso");
      handleClose();
    } catch (error) {
      console.error("Erro ao atualizar a tabela:", error);
      toast.error("Erro ao atualizar a tabela");
    }
  };

  const modalContent = (
    <>
      <dialog
        ref={dialogRef}
        className="p-8 rounded-lg shadow-lg backdrop:bg-black backdrop:bg-opacity-50 focus:outline-none max-w-[800px]"
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            handleClose();
          }
        }}
      ></dialog>
    </>
  );

  return isOpen ? ReactDOM.createPortal(modalContent, document.body) : null;
};

export default HiringModal;
