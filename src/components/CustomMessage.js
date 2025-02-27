import React from "react";

const CustomMessage = ({ imageUrl }) => {
    return (
        <div>
            {imageUrl ? (
                <img src={imageUrl} alt="Uploaded" style={{ width: '100%' }} />
            ) : (
                <p>이미지가 없습니다.</p>
            )}
        </div>
    );
};

export default CustomMessage;
