import { useEffect, useCallback, useRef } from "react";
import { useCart } from "./CartContext";
import { Link, useSearch } from "@tanstack/react-router";
import jsPDF from "jspdf";
import { useTranslation } from "react-i18next";

const Success = () => {
  const { cartItems, clearCart, totalCost } = useCart();
  const { i18n, t } = useTranslation();
  const searchParams = useSearch({ strict: false });
  useEffect(() => {
    const lang = searchParams.lang;
    const cur = searchParams.currency;

    if (lang && i18n.language !== lang) i18n.changeLanguage(lang);
    if (cur) localStorage.setItem("selectedCurrency", cur);
  }, [searchParams, i18n]);
  const generateInvoice = useCallback(() => {
    if (cartItems.length === 0) return;
    const invoiceNumber = String(Math.floor(Math.random() * 900000) + 100000);
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("HAPPY HOUR HEAVEN - INVOICE", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 20, 40);
    doc.text(`Invoice #: INV-${invoiceNumber}`, 20, 50);
    let yPosition = 70;
    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.text("Product", 20, yPosition);
    doc.text("Qty", 100, yPosition);
    doc.text("Price", 140, yPosition);
    doc.text("Total", 180, yPosition);
    doc.setFont(undefined, "normal");
    yPosition += 10;
    cartItems.forEach((item) => {
      doc.text(item.name.slice(0, 20) || "Product", 20, yPosition);
      doc.text(item.quantity.toString(), 100, yPosition);
      doc.text(`$NZ${item.price}`, 140, yPosition);
      doc.text(`$NZ${item.price * item.quantity}`, 180, yPosition);
      yPosition += 8;
    });
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text(`Total Amount: ${totalCost} $NZ`, 20, yPosition + 20);
    doc.save(`HappyHourHeaven-Invoice-${invoiceNumber}.pdf`);
  }, [cartItems, totalCost]);

  // Sync cart to Django backend after successful payment
  const syncCartToDjango = async () => {
    const token = localStorage.getItem("access");
    if (!token || cartItems.length === 0) return;

    try {
      const cartRes = await fetch("http://127.0.0.1:9000/api/cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: "paid",
        }),
      });

      console.log("Cart status:", cartRes.status); // ← thêm
      const cart = await cartRes.json();
      console.log("Cart created:", cart);
      console.log("Cart id:", cart.id); // ← thêm

      for (const item of cartItems) {
        const orderRes = await fetch(
          "http://127.0.0.1:9000/api/order_product/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              order: cart.id,
              product: item.id,
              quantity: item.quantity,
              price: item.price,
            }),
          },
        );
        console.log("Order product status:", orderRes.status); // ← thêm
      }
      console.log("Sync done!");
    } catch (error) {
      console.error("Failed to sync:", error);
    }
  };
  useEffect(() => {
    if (cartItems.length > 0) {
      const run = async () => {
        await syncCartToDjango();
        generateInvoice();
        clearCart();
      };
      run();
    }
  }, []);

  return (
    <div className="success-page">
      <h1>{t("paymentSuccessful", "Payment Successful! 🎉")}</h1>
      <p>
        {t(
          "invoiceDownloaded",
          "Your invoice has been downloaded automatically.",
        )}
      </p>
      <p>{t("cartCleared", "Cart has been cleared successfully.")}</p>
      <Link to="/home_page">{t("continueShopping", "Continue Shopping")}</Link>
    </div>
  );
};

export default Success;
