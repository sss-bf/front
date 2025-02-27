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
    const handleFileSelected = async (imageUrl) => {
      const imageMessage = await createChatBotMessage("📷 업로드된 사진:", {
        widget: "uploadedImage", // ✅ Add a widget to display the image
        payload: { imageUrl: imageUrl }, // ✅ Pass image URL as a payload
      });
      const message = createChatBotMessage("사진이 선택되었습니다. 촬영 의도가 있다면 입력하시고, 평가를 원하시면 엔터를 누르세요.");
      setState((prev) => ({
        ...prev,
        imageUrl: imageUrl,
        messages: [...prev.messages, imageMessage, message],
      }));
    };
  
    // Function when "No File Given" is clicked
    const handleNoFileSelected = () => {
      const message = createChatBotMessage("궁금한 사항을 텍스트로 입력해주세요.");
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    };

        // Function when a file is selected
        const newhandleFileSelected = async (imageUrl) => {
          const imageMessage = await createChatBotMessage("📷 업로드된 사진:", {
            widget: "uploadedImage", // ✅ Add a widget to display the image
            payload: { imageUrl: imageUrl }, // ✅ Pass image URL as a payload
          });
          const message = createChatBotMessage("사진이 선택되었습니다. 촬영 의도가 있다면 입력하시고, 평가를 원하시면 엔터를 누르세요.");
          setState((prev) => ({
            ...prev,
            imageUrl: imageUrl,
            messages: [...prev.messages, imageMessage, message],
          }));
        };
      
        // Function when "No File Given" is clicked
        const newhandleNoFileSelected = () => {
          const message = createChatBotMessage("궁금한 사항을 텍스트로 입력해주세요.");
          setState((prev) => ({
            ...prev,
            imageUrl: "",
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
            newhandleFileSelected,
            newhandleNoFileSelected,
            handleElse,
            handlePhotoOptionSelected
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;