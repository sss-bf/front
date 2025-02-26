import React, { useState } from "react";

const SSS = () => {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const uploadToS3 = async () => {
        if (!file) {
            alert("파일을 선택하세요.");
            return;
        }

        try {
            // 백엔드에서 Presigned URL 요청
            const fileName = encodeURIComponent(file.name);
            const response = await fetch(`http://localhost:8081/api/s3/presigned-url?fileName=${fileName}`);
            const presignedUrl = await response.text(); // 백엔드에서 URL을 반환한다고 가정

            // Presigned URL을 사용하여 S3에 직접 업로드
            const uploadResponse = await fetch(presignedUrl, {
                method: "PUT",
                body: file,
                headers: {
                    "Content-Type": file.type,
                },
            });

            if (!uploadResponse.ok) {
                throw new Error("S3 업로드 실패");
            }

            // 업로드된 파일의 URL 저장
            const fileUrl = presignedUrl.split("?")[0]; // 최종 저장 URL
            setImageUrl(fileUrl);
        } catch (error) {
            console.error("S3 업로드 실패:", error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadToS3}>S3 업로드</button>
            {imageUrl && (
                <div>
                    <p>업로드된 이미지:</p>
                    <img src={imageUrl} alt="Uploaded" width="300" />
                </div>
            )}
        </div>
    );
};

export default SSS;
