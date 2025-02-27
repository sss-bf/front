import React from "react";

const AiGuideImage = ({ payload }) => {
    if (!payload.image) {
        return null; // ✅ Don't render anything if image is empty
      }
    
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent",
      border: "2px rgba(100, 100, 100, 0.3) solid",
      width: "70vw",
      marginLeft: "7vw",
      padding: "10px",
      borderRadius: "8px",
      maxWidth: "250px",
      textAlign: "center",
    }}>
      {payload.image != "" && (
        <img 
          src={payload.image} 
          alt="AI Generated Guide" 
          width="200" 
          style={{ borderRadius: "8px", marginTop: "5p"}}
        />
      )}
    </div>
  );
};

export default AiGuideImage;
