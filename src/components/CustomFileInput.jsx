import React, { useState } from "react";

const CustomFileInput = ({ actionProvider, setState, children }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert("파일을 선택하세요!");
      return;
    }

    const fileUrl = URL.createObjectURL(file); // 로컬 미리보기용 URL
    actionProvider.handleFileUpload(fileUrl, file.name);

    setFile(null); // 선택한 파일 초기화
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%" }}>
      {/* 기존 텍스트 입력창 유지 */}
      {children}

      {/* 파일 선택 버튼 */}
      <input type="file" id="file-upload" style={{ display: "none" }} onChange={handleFileChange} />
      <label htmlFor="file-upload" style={{
        cursor: "pointer",
        backgroundColor: "#5ccc9d",
        color: "white",
        padding: "8px",
        borderRadius: "5px"
      }}>
        📎 파일 첨부
      </label>

      {/* 업로드 버튼 */}
      <button onClick={handleUpload} style={{
        backgroundColor: "#376B7E",
        color: "white",
        padding: "8px",
        borderRadius: "5px",
        cursor: "pointer"
      }}>
        업로드
      </button>
    </div>
  );
};

export default CustomFileInput;
