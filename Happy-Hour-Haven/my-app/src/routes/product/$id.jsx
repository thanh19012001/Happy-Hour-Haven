import { createFileRoute } from "@tanstack/react-router";
import ProductPage from "../../component/ProductPage";

export const Route = createFileRoute("/product/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ProductPage />
    </div>
  );
}
