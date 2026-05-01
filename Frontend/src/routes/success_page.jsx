import { createFileRoute } from "@tanstack/react-router";
import Success from "../component/Success";

export const Route = createFileRoute("/success_page")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Success />
    </div>
  );
}
