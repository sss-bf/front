import React, { useState } from "react";

const TestComponent = () => {
  const [response, setResponse] = useState(null);

  const sendPostRequest = async () => {
    const formData = new FormData();
    formData.append("text1", "test_url");
    formData.append("text2", "안녕하세요");

    try {
      const res = await fetch("http://localhost:8080/test", {
        method: "POST",
        body: formData, // FormData 사용
      });

      if (!res.ok) {
        throw new Error("서버 응답 오류: " + res.status);
      }

      const data = await res.json();
      setResponse(data);
      console.log("응답 데이터:", data);
    } catch (error) {
      console.error("POST 요청 오류:", error);
    }
  };

  return (
    <div>
      <h1>React fetch API로 FormData POST 요청</h1>
      <button onClick={sendPostRequest}>POST 요청 보내기</button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
};

export default TestComponent;
