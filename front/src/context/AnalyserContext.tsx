// src/contexts/AnalyzerContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { AnalyzerResponse } from "../utils/types";

interface AnalyzerContextProps {
  response: AnalyzerResponse | null;
  setResponse: (response: AnalyzerResponse) => void;
  clearResponse: () => void;
}

const AnalyzerContext = createContext<AnalyzerContextProps | undefined>(
  undefined
);

interface AnalyzerProviderProps {
  children: ReactNode;
}

export const AnalyzerProvider: React.FC<AnalyzerProviderProps> = ({
  children,
}) => {
  const [response, setResponseState] = useState<AnalyzerResponse | null>(null);

  const setResponse = (response: AnalyzerResponse) => {
    setResponseState(response);
  };

  const clearResponse = () => {
    setResponseState(null);
  };

  return (
    <AnalyzerContext.Provider value={{ response, setResponse, clearResponse }}>
      {children}
    </AnalyzerContext.Provider>
  );
};

export const useAnalyzerContext = (): AnalyzerContextProps => {
  const context = useContext(AnalyzerContext);
  if (context === undefined) {
    throw new Error(
      "useAnalyzerContext must be used within an AnalyzerProvider"
    );
  }
  return context;
};
