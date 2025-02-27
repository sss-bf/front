import React, { useState, useEffect, useRef } from "react";
import { createChatBotMessage } from "react-chatbot-kit";

const TestComponent = ({ state, setState }) => {
  const isRequesting = useRef(false);

  const sendPostRequest = async () => {
    if (isRequesting.current) return;

    isRequesting.current = true;

    setState((prev) => ({
      ...prev,
      isProcessing: true,
      isWaitingForResponse: true,
      aiGuideText: "", // Clear previous guide
      aiGuideImage: "",
    }));

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

      setState((prev) => ({
        ...prev,
        aiGuideText: data.guideText,
        aiGuideImage: data.guideImageUrl, // ✅ Save image first
        isProcessing: false,
        isWaitingForResponse: false,
      }));

      console.log("✅ Response received:", data);
    } catch (error) {
      console.error("POST 요청 오류:", error);
      setState((prev) => ({ ...prev, isProcessing: false, isWaitingForResponse: false }));
    } finally {
      isRequesting.current = false;
    }
  };

  useEffect(() => {
    if (state.imageUrl && state.userMessage) {
      sendPostRequest();
    }
  }, [state.imageUrl, state.userMessage]);

  // ✅ Ensure `botMessage` is created only when image is fully set
  useEffect(() => {
    if (state.aiGuideText && state.aiGuideImage) {
      console.log("✅ Guide image available, creating bot message...");

      const botMessage = createChatBotMessage(`${state.aiGuideText}`, {
        widget: "aiGuideImage",
        payload: { image: state.aiGuideImage },
      });

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    }
  }, [state.aiGuideText, state.aiGuideImage]); // ✅ Wait until both are set

  return null;
};

export default TestComponent;
