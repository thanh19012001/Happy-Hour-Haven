import { createFileRoute } from "@tanstack/react-router";
import RegisterForm from "../component/RegisterForm";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <RegisterForm />
    </div>
  );
}
