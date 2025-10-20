export interface Review {
  id: string;
  title: string;
  reason: string;
  priority: "HIGH" | "MIDDLE" | "LOW";
}
