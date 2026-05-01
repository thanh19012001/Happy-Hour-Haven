import { createFileRoute } from "@tanstack/react-router";
import SellerPage from "../../component/SellerPage";

export const Route = createFileRoute("/seller/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <SellerPage />
    </div>
  );
}
