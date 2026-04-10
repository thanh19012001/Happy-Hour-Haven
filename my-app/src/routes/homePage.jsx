import { createFileRoute } from "@tanstack/react-router";
import LoginForm from "../component/LoginForm";
export const Route = createFileRoute("/homePage")({
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      <HomePage />
    </div>
  );
}
