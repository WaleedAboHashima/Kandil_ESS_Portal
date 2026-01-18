import { createFileRoute } from "@tanstack/react-router";
import DepartmentTransfer from "@/pages/employee-transfer-request";

export const Route = createFileRoute(
  "/_authenticated/employee-transfer-request",
)({
  component: DepartmentTransfer,
});
