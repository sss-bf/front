// components/Chatbot.js
import React from "react";
import ChatBot from "react-chatbotify";
import "../App.css"; // 스타일 적용을 위해 import

const Chatbot = () => {
    const [name, setName] = React.useState("");
    const [image, setImage] = React.useState("");
    const [guide, setGuide] = React.useState("");

  const settings = {
    isOpen: true,
    general: {
      primaryColor: "#42b0c5",
      secondaryColor: "#491d8d",
      fontFamily: "Arial, sans-serif",
      embedded: true,
    },
    header: {
        title: "PSI",
        showAvatar: false,
    },
    audio: {
      disabled: true,
    },
    notification: {
        disabled: true,
    },
    chatHistory: {
      disabled: true,
    },
    footer: {
        text: '',
    }
  };

  const flow = {
    start: {
        message: "Hello there! What is your name?",
        function: (params) => setName(params.userInput),
        path: "upload_file"
    },
    upload_file: {
        message: (params) => `가이드를 받으실 사진을 올려주세요.`,
        chatDisabled: true,
        file: (params) => {
                            setImage(params.files);
                            return {chatDisabled: false};
                        },
        path: "upload_text"
    },
    upload_text: {
        message: (params) => `어떤 식으로 가이드 받고 싶은지 작성해주세요.`,
        chatDisabled: false,
        function: (params) => setGuide(params.userInput),
        path: "waiting_for_ai_response"
    },
    waiting_for_ai_response: {
        afterMessageRender: (params, setPath) => {
            setTimeout(() => {
                setPath("next_step"); // 5초 후 다음 단계로 이동
            }, 5000); // 5000ms = 5초
        }
    },
  };

  const styles = {
    headerStyle: {
        background: 'linear-gradient(90deg, #aea4e3, #d3ffe8)',
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
      },
    chatWindowStyle: {
        width: '70vw',
    },
    botBubbleStyle: {
        backgroundColor: 'rgba(228,237,245, 0.3)',
        color: 'rgb(78,79,79)',
    },
    userBubbleStyle: {
        color: 'rgb(171, 173, 220)',
        borderColor: 'rgb(181,193,223)',
        backgroundColor: 'transparent',
        border: '2px solid',
        fontWeight: '550',
    }
  };

  console.log(image);
  console.log(guide);
  return (
    <div className="chatbot-container">
      <ChatBot settings={settings} flow={flow} styles={styles}/>
    </div>
  );

};

export default Chatbot;
