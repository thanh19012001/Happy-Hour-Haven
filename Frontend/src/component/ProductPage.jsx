import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useCart } from "./CartContext";
import { useFavorite } from "./FavoriteContext";

const ProductPage = () => {
  const { id } = useParams({ from: "/products/$id" });
  const URL = `http://127.0.0.1:9000/api/products/${id}/`;
  const [chatRoom, setChatRoom] = useState(null);
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [activeSellerRoom, setActiveSellerRoom] = useState(null);

  // Review state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewMessage, setReviewMessage] = useState(null);

  const token = localStorage.getItem("access");

  const fetchProducts = async () => {
    const res = await fetch(URL);
    if (!res.ok) throw new Error("fail to fetch product");
    return res.json();
  };

  const fetchReviews = async () => {
    const res = await fetch(`http://127.0.0.1:9000/products/${id}/reviews/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("fail to fetch reviews");
    return res.json();
  };

  // Fetch pending chat requests for seller
  const fetchChatRequests = async () => {
    if (!token) return [];
    const res = await fetch("http://127.0.0.1:9000/chat/requests/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return [];
    return res.json();
  };

  const { handleAddToCart, totalItems } = useCart();
  const { handleAddToFavorite, totalFavorites } = useFavorite();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
  });

  const { data: reviews = [], refetch: refetchReviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: fetchReviews,
    staleTime: 5 * 60 * 1000,
  });

  const { data: chatRequests = [], refetch: refetchChatRequests } = useQuery({
    queryKey: ["chatRequests"],
    queryFn: fetchChatRequests,
    staleTime: 10 * 1000, // refresh every 10 seconds
    refetchInterval: 10000, // auto refresh every 10 seconds
  });

  // Buyer initiates chat
  const handleChatWithSeller = async () => {
    const response = await fetch("http://127.0.0.1:9000/chat/initiate/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ seller_id: product.sellerId }),
    });

    const data = await response.json();
    const roomId = data.room_id;
    setChatRoom(data);
    connectToRoom(roomId);
  };

  // Seller joins a chat room
  const handleJoinChat = async (roomId) => {
    setActiveSellerRoom(roomId);
    connectToRoom(roomId);
  };

  // Seller dismisses a chat request
  const handleDismissChat = async (roomId) => {
    await fetch(`http://127.0.0.1:9000/chat/requests/${roomId}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    refetchChatRequests();
    if (activeSellerRoom === roomId) {
      setActiveSellerRoom(null);
      if (socket) socket.close();
      setSocket(null);
      setMessages([]);
    }
  };

  // Connect to WebSocket room
  const connectToRoom = (roomId) => {
    if (socket) socket.close();
    const ws = new WebSocket(`ws://127.0.0.1:9000/ws/chat/${roomId}/`);
    ws.onopen = () => console.log("Connected to chat!");
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages((prev) => [...prev, msg]);
    };
    ws.onclose = () => console.log("Disconnected from chat");
    setSocket(ws);
  };

  const handleSendMessage = () => {
    if (socket && chatMessage.trim()) {
      socket.send(JSON.stringify({ message: chatMessage }));
      setChatMessage("");
    }
  };

  // Review handler
  const handleSubmitReview = async () => {
    if (!token) {
      setReviewMessage("Please log in to leave a review.");
      return;
    }

    const response = await fetch(
      `http://127.0.0.1:9000/products/${id}/reviews/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating, comment }),
      },
    );

    const data = await response.json();

    if (data.detail) {
      setReviewMessage("Review submitted successfully! ✅");
      setComment("");
      setRating(5);
      refetchReviews();
    } else {
      setReviewMessage(data.error);
    }
  };

  if (isError) return <div>Error: {error.message}</div>;

  // Check if logged in user is the seller of this product
  const isSeller =
    product &&
    token &&
    product.sellerId === JSON.parse(atob(token.split(".")[1])).user_id;

  return (
    <>
      <div>
        {isLoading && <div>Loading...</div>}
        {!isLoading && (
          <>
            <div className="header">
              <h1>Happy Hour Heaven 🥂</h1>
              <h3>
                If drunk driving is illegal, then why are there parking lots
                near a pub?
              </h3>
              <div className="nav_wrapper">
                <div className="shopping_cart_container">
                  <Link to="/cart_page" className="shopping_cart">
                    <button className="shopping_cart_button">
                      <FaShoppingCart size={35} color="blue" />
                      View Cart
                    </button>
                  </Link>
                  <div className="items_quantities">{totalItems}</div>
                </div>
                <div className="favorite_items_wrapper">
                  <Link to="/favorite_page" className="favorite_items">
                    <FaHeart size={30} color="red" />
                    Favorite list
                  </Link>
                  <div className="favorite_quantities">{totalFavorites}</div>
                </div>
              </div>
            </div>

            <div className="product-detail">
              <h2 className="product__name">{product.product_name}</h2>
              <img
                src={product.image}
                alt={product.product_name}
                style={{ width: 400, height: 400 }}
              />
              <p className="product__price">{product.price} $NZ</p>
              <p className="product__description">{product.description}</p>
              <button
                className="seller"
                onClick={() =>
                  navigate({
                    to: "/sellers/$id",
                    params: { id: String(product.sellerId) },
                  })
                }
              >
                Seller: {product.seller_name}
              </button>

              {/* Only show chat button if logged in and NOT the seller */}
              {token && !isSeller && !chatRoom && (
                <button onClick={handleChatWithSeller}>
                  💬 Chat with Seller
                </button>
              )}
            </div>

            <div className="product-actions">
              <button onClick={() => handleAddToCart(product)}>
                Add to cart <FaShoppingCart size={16} color="blue" />
              </button>
              <button onClick={() => handleAddToFavorite(product)}>
                Add to favorite <FaHeart size={16} color="red" />
              </button>
            </div>

            {/* SELLER — Pending chat requests */}
            {isSeller && (
              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginTop: "20px",
                  borderRadius: "8px",
                }}
              >
                <h3>💬 Pending Chats ({chatRequests.length})</h3>
                {chatRequests.length === 0 && (
                  <p style={{ color: "#999" }}>No pending chats.</p>
                )}
                {chatRequests.map((req) => (
                  <div
                    key={req.room_id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "8px",
                      padding: "8px",
                      border: "1px solid #eee",
                      borderRadius: "6px",
                    }}
                  >
                    <span>👤 {req.buyer} wants to chat</span>
                    <button onClick={() => handleJoinChat(req.room_id)}>
                      Join Chat
                    </button>
                    <button
                      onClick={() => handleDismissChat(req.room_id)}
                      style={{ color: "red" }}
                    >
                      Dismiss
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Chat window — for both buyer and seller */}
            {(chatRoom || activeSellerRoom) && (
              <div
                className="chat-window"
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginTop: "20px",
                  borderRadius: "8px",
                }}
              >
                <h3>
                  💬{" "}
                  {isSeller
                    ? `Chat with buyer`
                    : `Chat with ${chatRoom?.seller}`}
                </h3>
                <div
                  style={{
                    height: "200px",
                    overflowY: "scroll",
                    border: "1px solid #eee",
                    padding: "10px",
                    marginBottom: "10px",
                  }}
                >
                  {messages.length === 0 && (
                    <p style={{ color: "#999" }}>No messages yet. Say hello!</p>
                  )}
                  {messages.map((msg, index) => (
                    <p key={index}>
                      <strong>{msg.username}:</strong> {msg.message}
                    </p>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  style={{ width: "80%" }}
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            )}

            {/* Reviews section */}
            <div className="reviews-section" style={{ marginTop: "30px" }}>
              <h3>Reviews ({reviews.length})</h3>
              {reviews.length === 0 && <p>No reviews yet. Be the first!</p>}
              {reviews.map((review) => (
                <div
                  key={review.id}
                  style={{
                    border: "1px solid #eee",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "8px",
                  }}
                >
                  <p>
                    <strong>{review.user}</strong> — {"✫".repeat(review.rating)}
                  </p>
                  <p>{review.comment}</p>
                  <p style={{ color: "#999", fontSize: "12px" }}>
                    {review.date}
                  </p>
                </div>
              ))}

              {token && (
                <div
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "8px",
                    marginTop: "20px",
                  }}
                >
                  <h4>Leave a Review</h4>
                  <label>Rating: </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  >
                    <option value={1}>✫ 1</option>
                    <option value={2}>✫✫ 2</option>
                    <option value={3}>✫✫✫ 3</option>
                    <option value={4}>✫✫✫✫ 4</option>
                    <option value={5}>✫✫✫✫✫ 5</option>
                  </select>
                  <br />
                  <br />
                  <textarea
                    placeholder="Write your review..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    style={{ width: "100%" }}
                  />
                  <br />
                  <button onClick={handleSubmitReview}>Submit Review</button>
                  {reviewMessage && <p>{reviewMessage}</p>}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductPage;
