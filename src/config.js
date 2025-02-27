import React from "react";
import {
  createChatBotMessage,
  createCustomMessage,
} from "react-chatbot-kit";
import CustomMessage from "./components/CustomMessage";
import UploadedFileMessage from "./components/UploadedFileMessage";
import CustomFileInput from "./components/CustomFileInput";
import FileUpload from "./components/FileUpload"
import TestComponent from "./components/TestComponent";
import AiGuideImage from "./components/AiGuideImage";
import PhotoOption from "./components/PhotoOption";
const botName = "PSI";

const config = {
  botName: botName,
  initialMessages: [createChatBotMessage(`어떤 유형의 사진에 대한 가이드를 원하시나요?`, {
    widget: 'photoOption', 
  })],
  customStyles: {
    botMessageBox: {
      backgroundColor: "rgba(33, 66, 96, 0.3)", // ✅ Light grey background
      color: "rgb(78, 79, 79)", // ✅ Dark grey text
      fontWeight: "bold",
      borderRadius: "10px",
      border: "2px solid red !important",
      padding: "8px",
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
  widgets: [
    {
      widgetName: 'fileUpload',
      widgetFunc: (props) => <FileUpload {...props} />,
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
    disableUserInput: true,
    isProcessing: false,
    userMessage: "", // ✅ Store user input
    imageUrl: "", // ✅ Store image URL
  },
  customComponents: {
    header: () => <div style={headerStyle}>SinSa</div>,
    input: () => <div></div>
  },
};

const headerStyle = {
  background: ' #ff7b54',
  color: '#000000',
  padding: "10px",
  fontSize: "16px",
  textAlign: "center",
  fontWeight: "bold",
};

export default config;
