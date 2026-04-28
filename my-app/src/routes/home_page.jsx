import { createFileRoute } from "@tanstack/react-router";

import HomePage from "../component/HomePage";

export const Route = createFileRoute("/home_page")({
  component: HomePage,
});

function RouteComponent() {
  return (
    <div>
      <HomePage />
    </div>
  );
}
