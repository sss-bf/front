import React from "react";
import {
  createChatBotMessage,
  createCustomMessage,
} from "react-chatbot-kit";
import CustomMessage from "./components/CustomMessage";
import UploadedFileMessage from "./components/UploadedFileMessage";
import CustomFileInput from "./components/CustomFileInput";
import DogPicture from "./components/FileUpload"
import TestComponent from "./components/TestComponent";
import AiGuideImage from "./components/AiGuideImage";
import PhotoOption from "./components/PhotoOption";
const botName = "PSI";

const config = {
  botName: botName,
  initialMessages: [createChatBotMessage(`어떤 유형의 사진에 대한 가이드를 원하시나요?`, {
    widget: 'photoOption', 
  })],
  widgets: [
    {
      widgetName: 'fileUpload',
      widgetFunc: (props) => <DogPicture {...props} />,
    },
    {
      widgetName: 'testComponent',
      widgetFunc: (props) => {
        console.log("Debug: imageUrl in props =", props.state.imageUrl);
        return <TestComponent {...props} />;
      }
    },
    {
      widgetName: 'aiGuideImage',
      widgetFunc: (props) => <AiGuideImage {...props} />
    },
    {
      widgetName: 'photoOption',
      widgetFunc: (props) => <PhotoOption {...props} />
    }
  ],
  state: {
    waitingForComment: false,
    userMessage: "", // ✅ Store user input
    imageUrl: "", // ✅ Store image URL
  },
  customComponents: {
    header: () => <div style={headerStyle}>PSI</div>, // ✅ Custom Header
  },
};

const headerStyle = {
  background: 'linear-gradient(90deg, #aea4e3, #d3ffe8)',
  color: '#ffffff',
  padding: "10px",
  fontSize: "16px",
  textAlign: "center",
  fontWeight: "bold",
};

export default config;
