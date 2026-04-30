import { createFileRoute } from "@tanstack/react-router";
import CartPage from "../component/CartPage";
import Cancel from "../component/Cancel";

export const Route = createFileRoute("/cancel_page")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Cancel />
    </div>
  );
}
