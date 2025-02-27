import React from "react";

const PhotoOption = ({ setState, actionProvider }) => {
  const handleOptionSelect = (option) => {
    console.log("📸 Selected Photo Option:", option);

    // ✅ Save selected option in chatbot state
    setState((prev) => ({
      ...prev,
      photoOption: option,
    }));

    // ✅ Trigger next step in chatbot (Modify this to fit your logic)
    actionProvider.handlePhotoOptionSelected(option);
  };

  return (
    <div style={{ display: "flex", gap: "10px", flexDirection: "column", padding: "10px" }}>
      <button onClick={() => handleOptionSelect("인물")} style={buttonStyle}>👤 인물</button>
      <button onClick={() => handleOptionSelect("사물")} style={buttonStyle}>📷 사물</button>
    </div>
  );
};

// ✅ Style for buttons
const buttonStyle = {
  backgroundColor: "#5ccc9d",
  border: "none",
  padding: "10px",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
  width: "100%",
};

export default PhotoOption;
