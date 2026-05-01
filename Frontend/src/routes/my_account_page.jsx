import { createFileRoute } from "@tanstack/react-router";
import MyAccountPage from "../component/MyAccountPage";

export const Route = createFileRoute("/my_account_page")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <MyAccountPage />
    </div>
  );
}
