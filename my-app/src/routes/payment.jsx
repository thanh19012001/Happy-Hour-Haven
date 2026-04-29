import { createFileRoute } from "@tanstack/react-router";
import PaymentPage from "../component/PaymentPage";

export const Route = createFileRoute("/payment")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <PaymentPage />
    </div>
  );
}
