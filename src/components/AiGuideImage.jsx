import React from "react";

const AiGuideImage = ({ payload }) => {
    if (!payload.image) {
        return null; // ✅ Don't render anything if image is empty
      }
    
  return (
    <div style={{
      backgroundColor: "rgb(87,86,86)",
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
          style={{ borderRadius: "8px", marginTop: "5px" }}
        />
      )}
    </div>
  );
};

export default AiGuideImage;
