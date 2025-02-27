import React from "react";

const UploadedImage = ({ payload }) => {
  return (
    <div style={styles.container}>
      <img src={payload.imageUrl} alt="Uploaded" style={styles.image} />
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "10px",
  },
  image: {
    width: "100%", // ✅ Ensure it fits well inside the chatbot
    maxWidth: "300px", // ✅ Prevents oversized images
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
};

export default UploadedImage;
