import React, { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import {
  createChatBotMessage,
  createCustomMessage,
} from "react-chatbot-kit";

const TestComponent = ({ state, setState }) => {
  const [response, setResponse] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const isRequesting = useRef(false);

  const sendPostRequest = async () => {
    if (isRequesting.current) return; 

    isRequesting.current = true;

    setState((prev) => ({ ...prev, isProcessing: true }));

    const formData = new FormData();
    console.log("TestComponent - " + state.photoOption);
    formData.append("option", state.photoOption);
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
      
      console.log(data.guideText);
      const markdownText = data.guideText;

const removeHtmlTags = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");

  // ✅ Convert <p> and <div> to text with `\n`
  doc.body.querySelectorAll("p, div").forEach((el) => {
    el.replaceWith(el.textContent + "\n");
  });

  let cleanText = doc.body.textContent.trim();

  return cleanText;
};

const cleanText = removeHtmlTags(markdownText);

      setState((prev) => ({
        ...prev,
        aiGuideText: data.guideText,
        aiGuideImage: data.guideImageUrl,
      }));

      const botMessage = createChatBotMessage(`${cleanText}`, {
          widget: 'aiGuideImage',
          payload: {image: data.guideImageUrl}
      });

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));

      console.log("응답 데이터:", data);

      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          imageUrl: "",
          aiGuideText: "",
          aiGuideImage: "",
          isProcessing: false,
          messages: [
            ...prev.messages,
            createChatBotMessage("추가적으로 무엇을 도와드릴까요?", {
              widget: "newFileUpload",
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
    if (state.imageUrl || state.userMessage) {
      sendPostRequest();
      console.log("hi from test component")
    }
  }, [state.imageUrl, state.userMessage]);


};

export default TestComponent; // ✅ Make sure this is a default export
