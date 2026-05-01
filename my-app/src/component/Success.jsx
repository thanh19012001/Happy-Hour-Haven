import { useEffect, useCallback } from "react";
import { useCart } from "./CartContext";
import { Link } from "@tanstack/react-router";
import jsPDF from "jspdf";

const Success = () => {
  const { cartItems, clearCart, totalCost } = useCart();

  const generateInvoice = useCallback(() => {
    if (cartItems.length === 0) return;

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("HAPPY HOUR HEAVEN - INVOICE", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 20, 40);
    doc.text(`Invoice #: INV-${Date.now().toString().slice(-6)}`, 20, 50);

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

    doc.save(`HappyHourHeaven-Invoice-${Date.now().toString().slice(-6)}.pdf`);
  }, [cartItems, totalCost]);

  useEffect(() => {
    if (cartItems.length > 0) {
      generateInvoice();
      clearCart();
    }
  }, []);

  return (
    <div className="success-page">
      <h1>Payment Successful! </h1>
      <p>Your invoice has been downloaded automatically.</p>
      <p>Cart has been cleared successfully.</p>
      <Link to="/home_page">Continue Shopping</Link>
    </div>
  );
};

export default Success;
