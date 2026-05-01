import { createFileRoute } from "@tanstack/react-router";
import CartPage from "../component/CartPage";

export const Route = createFileRoute("/cart_page")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <CartPage />
    </div>
  );
}
