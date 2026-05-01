import { useEffect, useCallback, useRef } from "react";
import { useCart } from "./CartContext";
import { Link } from "@tanstack/react-router";
import jsPDF from "jspdf";

const Success = () => {
  // Get cartItems, clearCart, totalCost from CartContext
  const { cartItems, clearCart, totalCost } = useCart();
  // useCallback to avoid re-creating function on every render
  const generateInvoice = useCallback(() => {
    if (cartItems.length === 0) return;
    const invoiceNumber = String(Math.floor(Math.random() * 900000) + 100000);
    // Create new PDF file
    const doc = new jsPDF();

    // Centered title
    doc.setFontSize(20);
    doc.text("HAPPY HOUR HEAVEN - INVOICE", 105, 20, { align: "center" });

    // Invoice info
    doc.setFontSize(12);
    doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 20, 40);
    // Generate random 6 digit invoice number
    doc.text(`Invoice #: INV-${invoiceNumber}`, 20, 50);

    // Table header - bold
    let yPosition = 70;
    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.text("Product", 20, yPosition);
    doc.text("Qty", 100, yPosition);
    doc.text("Price", 140, yPosition);
    doc.text("Total", 180, yPosition);

    // Product list - normal weight
    doc.setFont(undefined, "normal");
    yPosition += 10; // move down after header
    cartItems.forEach((item) => {
      doc.text(item.name.slice(0, 20) || "Product", 20, yPosition);
      doc.text(item.quantity.toString(), 100, yPosition);
      doc.text(`$NZ${item.price}`, 140, yPosition);
      // Calculate total price per item
      doc.text(`$NZ${item.price * item.quantity}`, 180, yPosition);
      yPosition += 8; // move to next line
    });

    // Total amount for entire order
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text(`Total Amount: ${totalCost} $NZ`, 20, yPosition + 20);

    doc.save(`HappyHourHeaven-Invoice-${invoiceNumber}.pdf`);
  }, [cartItems, totalCost]); // only re-create when cartItems or totalCost changes

  useEffect(() => {
    if (cartItems.length > 0) {
      generateInvoice(); // generate and download invoice
      clearCart(); // clear cart after invoice is generated
    }
  }, []);

  return (
    <div className="success-page">
      <h1>Payment Successful! </h1>
      <p>Your invoice has been downloaded automatically.</p>
      <p>Cart has been cleared successfully.</p>
      {/* Navigate back to home page */}
      <Link to="/home_page">Continue Shopping</Link>
    </div>
  );
};

export default Success;
