import { createFileRoute } from "@tanstack/react-router";
import LoginForm from "../component/LoginForm";
export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
