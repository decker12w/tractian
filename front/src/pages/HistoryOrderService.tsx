import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaIndustry } from "react-icons/fa";
import { LoginDTO, LoginSchema } from "../utils/schemas/auth";
import { useAuthContext } from "../context/AuthProvider";
import { api } from "../utils/api/api";

// Define TypeScript types for orders
interface Order {
  id: string;
  status: string;
}

interface OrdersResponse {
  openOrders: Order[];
  inProgressOrders: Order[];
  finishedOrders: Order[];
}

interface OrdersState {
  open: Order[];
  inProgress: Order[];
  completed: Order[];
}

interface OrdersProps {
  orders: Order[];
}

// API call to fetch orders
async function fetchOrders(): Promise<OrdersState> {
  const response = await api.get<OrdersResponse>("/orders/technical");
  const { openOrders, inProgressOrders, finishedOrders } = response.data;

  return {
    open: openOrders,
    inProgress: inProgressOrders,
    completed: finishedOrders,
  };
}

// Open Orders Component
function OpenOrders({ orders }: OrdersProps) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold">Ordens em Aberto:</h2>
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex justify-between items-center mt-2 bg-gray-800 p-2 rounded-md"
        >
          <span>{order.id}</span>
          <button className="bg-green-500 px-3 py-1 rounded-md">
            {order.status}
          </button>
          <button className="bg-blue-500 px-3 py-1 rounded-md">Download</button>
        </div>
      ))}
    </div>
  );
}

// In Progress Orders Component
function InProgressOrders({ orders }: OrdersProps) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold">Ordens em Progresso:</h2>
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex justify-between items-center mt-2 bg-gray-800 p-2 rounded-md"
        >
          <span>{order.id}</span>
          <button className="bg-yellow-500 px-3 py-1 rounded-md">
            {order.status}
          </button>
          <button className="bg-blue-500 px-3 py-1 rounded-md">Download</button>
        </div>
      ))}
    </div>
  );
}

// Completed Orders Component
function CompletedOrders({ orders }: OrdersProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold">Ordens Finalizadas:</h2>
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex justify-between items-center mt-2 bg-gray-800 p-2 rounded-md"
        >
          <span>{order.id}</span>
          <button className="bg-blue-500 px-3 py-1 rounded-md">Download</button>
        </div>
      ))}
    </div>
  );
}

export default function HistoryOrderService() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  const { loginUser } = useAuthContext();
  const [orders, setOrders] = useState<OrdersState>({
    open: [],
    inProgress: [],
    completed: [],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>({
    resolver: zodResolver(LoginSchema),
    mode: "all",
  });

  const onSubmit = async (data: LoginDTO) => {
    console.log("Login Data:", data);
  };

  // Fetch orders on component mount
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const fetchedOrders = await fetchOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    loadOrders();
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center gap-8 py-8">
      <FaIndustry className="absolute top-6 left-6" size={50} />

      <div className="w-full flex items-center justify-center gap-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-background text-white py-10 px-24 rounded-3xl"
        >
          <div className="w-[300px] flex flex-col gap-2.5 items-center">
            <h1 className="text-4xl font-bold mb-3 text-center">
              Histórico de Ordem de Serviço
            </h1>

            {/* Open Orders */}
            <OpenOrders orders={orders.open} />

            {/* In Progress Orders */}
            <InProgressOrders orders={orders.inProgress} />

            {/* Completed Orders */}
            <CompletedOrders orders={orders.completed} />
          </div>
        </form>
      </div>
    </div>
  );
}
