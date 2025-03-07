// import React, { useState } from "react";
// import AWS from "aws-sdk";
// import CustomMessage from "../components/CustomMessage"; // CustomMessage 불러오기

// const S3Upload = () => {
//     const [file, setFile] = useState(null);
//     const [imageUrl, setImageUrl] = useState("");

//     const S3_BUCKET = process.env.REACT_APP_S3_BUCKET_NAME;
//     const REGION = process.env.REACT_APP_S3_REGION;
//     const ACCESS_KEY = process.env.REACT_APP_AWS_ACCESS_KEY;
//     const SECRET_KEY = process.env.REACT_APP_AWS_SECRET_KEY;

// git action secret 수정

//     AWS.config.update({
//         accessKeyId: ACCESS_KEY,
//         secretAccessKey: SECRET_KEY,
//         region: REGION
//     });

//     const s3 = new AWS.S3();

//     const handleFileChange = (event) => {
//         setFile(event.target.files[0]);
//     };

//     const uploadToS3 = async () => {
//         if (!file) {
//             alert("파일을 선택하세요.");
//             return;
//         }

//         const fileName = file.name;
//         const params = {
//             Bucket: S3_BUCKET,
//             Key: fileName,
//             Body: file,
//             ContentType: file.type
//         };

//         try {
//             const upload = await s3.upload(params).promise();
//             setImageUrl(upload.Location);
//             console.log(imageUrl);
//         } catch (error) {
//             console.error("S3 업로드 실패:", error);
//         }
//     };

//     return (
//         <div>
//             <input type="file" onChange={handleFileChange} />
//             <button onClick={uploadToS3}>{imageUrl}</button>

//             {/* 이미지 URL을 CustomMessage에 전달 */}
//             {imageUrl && <CustomMessage imageUrl={imageUrl} />}
//         </div>
//     );
// };

// export default S3Upload;


// import React, { useState } from "react";
// import AWS from "aws-sdk";

// const S3Upload = () => {
//     const [file, setFile] = useState(null);
//     const [imageUrl, setImageUrl] = useState("");

//     // 환경 변수에서 AWS S3 정보 가져오기
//     const S3_BUCKET = process.env.REACT_APP_S3_BUCKET_NAME;
//     const REGION = process.env.REACT_APP_S3_REGION;
//     const ACCESS_KEY = process.env.REACT_APP_AWS_ACCESS_KEY;
//     const SECRET_KEY = process.env.REACT_APP_AWS_SECRET_KEY;

//     console.log("📌 AWS SDK 설정:");
//     console.log("S3_BUCKET:", S3_BUCKET);
//     console.log("S3_REGION:", REGION);
//     console.log("AWS_ACCESS_KEY:", ACCESS_KEY ? "OK" : "undefined");
//     console.log("AWS_SECRET_KEY:", SECRET_KEY ? "OK" : "undefined");

//     // IAM 키를 명시적으로 설정
//     AWS.config.update({
//         accessKeyId: ACCESS_KEY,
//         secretAccessKey: SECRET_KEY,
//         region: REGION
//     });

//     const s3 = new AWS.S3();

//     const handleFileChange = (event) => {
//         setFile(event.target.files[0]);
//     };

//     const uploadToS3 = async () => {
//         if (!file) {
//             alert("파일을 선택하세요.");
//             return;
//         }

//         const fileName = file.name;

//         const params = {
//             Bucket: S3_BUCKET,
//             Key: fileName,
//             Body: file,
//             ContentType: file.type
//             // 🚀 "ACL": "public-read" 제거!
//         };

//         try {
//             const upload = await s3.upload(params).promise();
//             console.log("📌 S3 업로드 완료:", upload.Location);
//             setImageUrl(upload.Location);
//         } catch (error) {
//             console.error("S3 업로드 실패:", error);
//         }
//     };

//     return (
//         <div>
//             <input type="file" onChange={handleFileChange} />
//             <button onClick={uploadToS3}>S3 업로드</button>
//             {imageUrl && (
//                 <div>
//                     <p>업로드된 이미지:</p>
//                     <img src={imageUrl} alt="Uploaded" width="300" />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default S3Upload;
