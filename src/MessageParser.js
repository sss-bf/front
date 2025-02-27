// in MessageParser.jsx
import React from 'react';

const MessageParser = ({ children, actions }) => {
  const keywords = ["가이드", "guide", "보정"];
  const parse = (message) => {
  if (keywords.some((word) => message.includes(word))) {
      actions.handleDog();
    }
    else{
      actions.handleElse(message);
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;