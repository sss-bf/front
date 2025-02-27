import React, { useState, useEffect } from "react";
import AWS from "aws-sdk";

const DogPicture = ({ actionProvider }) => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const S3_BUCKET = process.env.REACT_APP_S3_BUCKET_NAME;
  const REGION = process.env.REACT_APP_S3_REGION;
  const ACCESS_KEY = process.env.REACT_APP_AWS_ACCESS_KEY;
  const SECRET_KEY = process.env.REACT_APP_AWS_SECRET_KEY;

  console.log(S3_BUCKET)
  console.log(REGION)
  console.log(ACCESS_KEY)

  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
    region: REGION,
  });

  const s3 = new AWS.S3();

  useEffect(() => {
    if (!file) return;

    setIsUploading(true); // Show loading spinner

    const uploadToS3 = async () => {
      const fileName = file.name;
      const params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Body: file,
        ContentType: file.type,
      };

      try {
        const upload = await s3.upload(params).promise();
        console.log("Uploaded Image URL:", upload.Location);
        setImageUrl(upload.Location);

        // ⏳ Simulate delay before showing image
        setTimeout(() => {
          setIsUploading(false); // Hide spinner
          setShowImage(true); // Show image
          actionProvider.handleFileSelected(upload.Location);
        }, 1000);

      } catch (error) {
        console.error("S3 Upload Failed:", error);
        setIsUploading(false);
      }
    };

    uploadToS3();
  }, [file]);

  const handleNoFile = () => {
    setFile(null);
    setImageUrl("");
    setIsUploading(false);
    setShowImage(false);
    actionProvider.handleNoFileSelected();
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {/* File selection buttons */}
      {!imageUrl && !isUploading && (
        <>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
            id="fileInput"
          />
          <button onClick={() => document.getElementById("fileInput").click()}>
            📂 Select File
          </button>
          <button onClick={handleNoFile}>🚫 No File Given</button>
        </>
      )}

      {/* Loading spinner while uploading */}
      {isUploading && (
        <div style={{ marginTop: "20px" }}>
          <p>📂 Uploading image... Please wait.</p>
          <div className="spinner"></div>
        </div>
      )}

      {/* Show uploaded image after delay */}
      {showImage && imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <h3>Uploaded Image:</h3>
          <img 
            src={imageUrl} 
            alt="Uploaded" 
            width="300"
            onLoad={() => setIsUploading(false)} 
            onError={() => {
              setIsUploading(false);
              setImageUrl("");
              console.error("Image failed to load.");
            }}
          />
        </div>
      )}

      {/* CSS for Spinner */}
      <style>
        {`
          .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-left-color: #09f;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 10px auto;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default DogPicture;
