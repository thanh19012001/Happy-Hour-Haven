import { createFileRoute } from "@tanstack/react-router";
import CartPage from "../component/CartPage";
import ContactPage from "../component/ContactPage";

export const Route = createFileRoute("/contact_page")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ContactPage />
    </div>
  );
}
