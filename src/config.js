import React from "react";
import {
  createChatBotMessage,
  createCustomMessage,
} from "react-chatbot-kit";
import CustomMessage from "./components/CustomMessage";
import UploadedFileMessage from "./components/UploadedFileMessage";
import CustomFileInput from "./components/CustomFileInput";
import FileUpload from "./components/FileUpload"
import NewFileUpload from "./components/NewFileUpload";
import UploadedImage from "./components/UploadedImage";
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
      widgetName: 'newFileUpload',
      widgetFunc: (props) => <NewFileUpload {...props} />
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
    },
    {
      widgetName: 'uploadedImage',
      widgetFunc: (props) => <UploadedImage {...props} />
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
    header: () => (
      <div style={styles.header}>
        <div style={styles.circle}>
          <span style={styles.circleText}></span>
        </div>
        <span style={styles.mainText}>SinSa</span>
      </div>
    ),
    input: () => <div></div>
  },
};

const styles = {
  header: {
    height: "50px", // Slightly increase height
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "white",
    borderRadius: "50px", // More rounded
    border: "4px solid #a71f31", // Dark red border
    padding: "10px 20px", // More inner spacing
    position: "relative",
    gap: "15px", // Better spacing between elements
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // ✅ Adds subtle depth
  },
  circle: {
    width: "45px",
    height: "45px",
    backgroundColor: "#a71f31",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: "10px", // Adjust positioning
    boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)", // ✅ Slight shadow for 3D effect
  },
  circleText: {
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    fontFamily: "'Nanum Gothic Yet Hangul', sans-serif",
  },
  mainText: {
    fontSize: "40px", // Slightly larger
    fontFamily: "AuraBell",
    fontWeight: "bold",
    color: "#333", // Darker for better contrast
    letterSpacing: "1px", // ✅ More readability
  },
};



export default config;
