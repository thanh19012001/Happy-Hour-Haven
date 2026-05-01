import { createFileRoute } from "@tanstack/react-router";
import LoginForm from "../component/LoginForm";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
