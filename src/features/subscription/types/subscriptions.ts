export type PlanType = "BASIC" | "PREMIUM" | "ENTERPRISE";
export type StatusType = "ACTIVE" | "CANCELLED" | "EXPIRED";

export interface SubType {
  id: string;
  userId: string;
  planType: PlanType;
  status: StatusType;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}
