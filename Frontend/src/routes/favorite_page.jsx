import { createFileRoute } from "@tanstack/react-router";
import FavoritePage from "../component/FavoritePage";

export const Route = createFileRoute("/favorite_page")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <FavoritePage />
    </div>
  );
}
