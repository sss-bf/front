import React from "react";

const UploadedFileMessage = ({ fileUrl }) => {
  return (
    <div style={{
      backgroundColor: "#376B7E", 
      padding: "10px", 
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      maxWidth: "250px"
    }}>
      <p style={{ color: "white", fontSize: "14px", marginBottom: "5px" }}>📷 업로드된 이미지</p>
      <img 
        src={fileUrl} 
        alt="Uploaded" 
        style={{ width: "100%", borderRadius: "8px" }} 
      />
    </div>
  );
};

export default UploadedFileMessage;
