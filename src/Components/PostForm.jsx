import React, { useState } from "react";
import axios from "axios";

const PostForm = () => {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://stop-to-repost-server.vercel.app/postData", {
        url,
      });
      setMessage({ text: response.data.message, type: "success" });
      setUrl("");
    } catch (error) {
      console.error(error);
      setMessage({ text: "Failed to post URL.", type: "error" });
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <input
          style={{
            marginBottom: "10px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
          }}
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
          type="submit"
        >
          Post
        </button>
      </form>
      {message && (
        <p
          style={{
            marginTop: "10px",
            fontSize: "14px",
            color: message.type === "error" ? "#ff0000" : "#008000",
            border: "1px solid",
            borderColor: message.type === "error" ? "#ff0000" : "#008000",
            borderRadius: "5px",
            padding: "5px 10px",
            backgroundColor: message.type === "error" ? "#ffbaba" : "#d4edda",
          }}
        >
          {message.text}
        </p>
      )}
    </div>
  );
};

export default PostForm;
