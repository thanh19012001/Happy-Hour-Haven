import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./component/CartContext";
import { FavoriteProvider } from "./component/FavoriteContext";
import { ContactProvider } from "./component/ContactContext";
import { CurrencyProvider } from "./component/CurrencyContext";
import "./i18n.js";
import "./css/main.css"
import { AvatarProvider } from "./component/AvatarContext";

const router = createRouter({ routeTree });
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <FavoriteProvider>
          <ContactProvider>
            <CurrencyProvider>
              <AvatarProvider>
                <RouterProvider router={router} />
              </AvatarProvider>
            </CurrencyProvider>
          </ContactProvider>
        </FavoriteProvider>
      </CartProvider>
    </QueryClientProvider>
  </StrictMode>,
);
