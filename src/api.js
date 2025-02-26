const API_URL = "http://localhost:8080/test"; // 백엔드 API URL

export const sendPostRequest = async (data) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("서버 응답 오류: " + response.status);
    }

    return await response.json(); // JSON 응답 변환
  } catch (error) {
    console.error("POST 요청 오류:", error);
    throw error;
  }
};
