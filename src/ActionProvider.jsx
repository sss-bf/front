import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleDog = () => {
    const botMessage = createChatBotMessage(
      "사진을 올려주세요.",
      {
        widget: 'dogPicture',
      }
    );


    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleElse = (userMessage) => {
    console.log(userMessage);

    setState((prev) => {
      if (prev.isProcessing) {
        console.log("❌ Request ignored - AI is still processing.");
        return prev; // Ignore new requests
      }

      console.log("✅ New request received:", userMessage);

      const botMessage = createChatBotMessage(
        "답변을 생성 중입니다. 잠시만 기다려 주세요...",
        {
          widget: "testComponent",
        }
      );
      return {
        ...prev,
        isProcessing: true, // 🚀 Set processing state
        userMessage: userMessage,
        messages: [...prev.messages, botMessage],
      };
    });
  }

  const handlePhotoOptionSelected = (option) => {
    console.log("📸 User selected:", option);

    const message = createChatBotMessage(`"${option}" 가이드를 선택하셨습니다.`, {
      widget: "fileUpload", // ✅ Move to next step (Modify if needed)
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  
    // Function when a file is selected
    const handleFileSelected = (imageUrl) => {
      const message = createChatBotMessage("사진이 선택되었습니다. 원하시는 가이드를 입력해주세요.");
      setState((prev) => ({
        ...prev,
        imageUrl: imageUrl,
        messages: [...prev.messages, message],
      }));
    };
  
    // Function when "No File Given" is clicked
    const handleNoFileSelected = () => {
      const message = createChatBotMessage("사진이 선택되지 않았습니다. 원하시는 가이드를 입력해주세요.");
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    };

  // Put the handleHello and handleDog function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleDog,
            handleFileSelected,
            handleNoFileSelected,
            handleElse,
            handlePhotoOptionSelected
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;