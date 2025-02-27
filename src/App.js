import logo from './logo.svg';
import './App.css';
import './fonts/font.css'
// import Chatbot from './components/Chatbot.js';
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import config from './config'
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
function App() {
  return (
    <div className="App">
      <Chatbot    config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        headerText='PSI'/>
    </div>
  );
}

export default App;
