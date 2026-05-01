import { createFileRoute } from "@tanstack/react-router";
import ProductPage from "../../component/ProductPage";

export const Route = createFileRoute("/products/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ProductPage />
    </div>
  );
}
