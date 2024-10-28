export enum OrderType {
  PREDITIVA = "PREDITIVA",
  PREVENTIVA = "PREVENTIVA",
  CORRETIVA = "CORRETIVA",
  INSPECAO = "INSPECAO",
}

export enum Roles {
  TECHNICAL = "TECHNICAL",
  PLANNER = "PLANNER",
}

export type AnalyzerResponse = {
  analysisResult: {
    title: string;
    description: string;
    type: OrderType;
    machineName: string;
  }[];
};
