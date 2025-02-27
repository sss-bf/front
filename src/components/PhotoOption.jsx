import React from "react";

const PhotoOption = ({ setState, actionProvider }) => {
  const handleOptionSelect = (option) => {
    console.log("📸 Selected Photo Option:", option);
    let photoOption;
    if(option == "인물 사진 촬영"){
      photoOption = 1;
    }
    else if(option == "제품 판매 콘텐츠"){
      photoOption = 2;
    }

    console.log("PhotoOption.jsx : After if  - " + option);
    // ✅ Save selected option in chatbot state
    setState((prev) => ({
      ...prev,
      photoOption: photoOption,
    }));

    // ✅ Trigger next step in chatbot (Modify this to fit your logic)
    actionProvider.handlePhotoOptionSelected(option);
  };

  return (
    <div style={{ display: "flex", gap: "10px", flexDirection: "column", padding: "10px", width: "100%", alignItems: "center", }}>
      <button onClick={() => handleOptionSelect("인물 사진 촬영")} style={buttonStyle}  onMouseEnter={(e) => (e.target.style.backgroundColor = "rgb(120, 120, 120)")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "rgb(31, 31, 31)")}>인물 사진 촬영 가이드</button>
      <button onClick={() => handleOptionSelect("제품 판매 콘텐츠")} style={buttonStyle}  onMouseEnter={(e) => (e.target.style.backgroundColor = "rgb(120, 120, 120)")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "rgb(31, 31, 31)")}>제품 판매 콘텐츠 가이드</button>
    </div>
  );
};

// ✅ Style for buttons
const buttonStyle = {
  backgroundColor: "rgb(31, 31, 31)",
  display: "flex",
  justifyContent: "center",
  border: "none",
  padding: "10px",
  color: "white",
  borderRadius: "40px",
  cursor: "pointer",
  fontSize: "14px",
  width: "70%",
  fontFamily: "NanumSquare"
};

export default PhotoOption;
