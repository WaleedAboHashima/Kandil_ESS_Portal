import { createFileRoute } from "@tanstack/react-router";
import Recruitment from "@/pages/hire-request";

export const Route = createFileRoute("/_authenticated/hire-request")({
  component: Recruitment,
});
