import React, { useState, useEffect, useRef } from "react";
import {
  createChatBotMessage,
  createCustomMessage,
} from "react-chatbot-kit";

const TestComponent = ({ state, setState }) => { // ✅ Receive chatbot state (imageUrl, userMessage)
  const [response, setResponse] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const isRequesting = useRef(false);

  const sendPostRequest = async () => {
    if (!state.imageUrl || !state.userMessage || isRequesting.current) return; // ✅ Prevent sending request if data is missing

    isRequesting.current = true;

    setState((prev) => ({ ...prev, isProcessing: true }));

    const formData = new FormData();
    formData.append("url", state.imageUrl);
    formData.append("intend", state.userMessage);

    try {
      const res = await fetch("http://localhost:8080/test", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("서버 응답 오류: " + res.status);
      }

      const data = await res.json();
      setResponse(data);
      setImgUrl(data.guideImageUrl);
      
      setState((prev) => ({
        ...prev,
        aiGuideText: data.guideText, // ✅ Save AI-generated text
        aiGuideImage: data.guideImageUrl, // ✅ Save AI-generated image
      }));

      const botMessage = createChatBotMessage(`${data.guideText}`, {
          widget: 'aiGuideImage',
          payload: {image: data.guideImageUrl}
      });

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage], // ✅ Append message to chatbot
      }));

      console.log("응답 데이터:", data);

      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          aiGuideText: "",
          aiGuideImage: "",
          isProcessing: false,
          messages: [
            ...prev.messages,
            createChatBotMessage("📂 파일을 추가로 업로드 하시겠습니까?", {
              widget: "fileUpload",
            }),
          ],
        }));
      }, ); // ✅ Restart process after 5 seconds
    } catch (error) {
      console.error("POST 요청 오류:", error);
    }
  };

  useEffect(() => {
    console.log("state.imageUrl : ", state.imageUrl)
    if (state.imageUrl && state.userMessage) {
      sendPostRequest();
      console.log("hi from test component")
    }
  }, [state.imageUrl, state.userMessage]);


};

export default TestComponent; // ✅ Make sure this is a default export
