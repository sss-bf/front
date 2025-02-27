import React from "react";

const AiGuideImage = ({ payload }) => {
    console.log("Hi from BotResponse")
  return (
    <div style={{
      backgroundColor: "#f4f4f4",
      padding: "10px",
      borderRadius: "8px",
      maxWidth: "250px",
      textAlign: "center",
    }}>
      <p>💡 AI 가이드:</p>
      {payload.image && (
        <img 
          src={payload.image} 
          alt="AI Generated Guide" 
          width="200" 
          style={{ borderRadius: "8px", marginTop: "5px" }}
        />
      )}
    </div>
  );
};

export default AiGuideImage;
