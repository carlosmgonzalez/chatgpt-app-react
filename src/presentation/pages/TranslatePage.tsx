import { useState } from "react";
import { TypingLoader } from "../components/chat/TypingLoader";
import { translateUseCase } from "../../core/use-cases/translate.use-case";
import { MessageBoxSelect } from "../components/chat/MessageBoxSelect";
import { ErrorAlert } from "../components/alerts/ErrorAlert";
import { MessagesList } from "../components/chat/MessagesList";

interface Message {
  text: string;
  isGpt: boolean;
}

const langOptions = [
  {
    id: "1",
    text: "Ingles",
  },
  {
    id: "2",
    text: "Frances",
  },
  {
    id: "3",
    text: "Arabe",
  },
  {
    id: "4",
    text: "Español",
  },
];

export const TranslatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handlePost = async (text: string, selectedOption: string) => {
    console.log({ selectedOption, text });

    setIsLoading(true);
    setMessages((prevMsg) => [...prevMsg, { isGpt: false, text }]);

    setMessages((prevMsg) => [...prevMsg, { isGpt: true, text: "" }]);
    let streamMessage = "";

    setIsLoading(false);
    const response = await translateUseCase(text, selectedOption, (chunk) => {
      streamMessage += chunk;
      setMessages((prevMsg) => {
        const newMessages = [...prevMsg];
        newMessages[newMessages.length - 1].text = streamMessage;
        return newMessages;
      });
    });

    if (!response.ok) {
      setError("Something went wrong");
      setIsLoading(false);
      return;
    }

    setError(null);
  };

  return (
    <div className="chat-container-page">
      <div className="chat-container">
        {error && <ErrorAlert error={error} />}
        <div className="chat-messages">
          {messages.map((message, i) => (
            <MessagesList message={message} key={`${i + message.text}`} />
          ))}
          {isLoading && <TypingLoader />}
        </div>
      </div>
      <div className="message-box-px">
        <MessageBoxSelect
          options={langOptions}
          onSendMessage={handlePost}
          placeholder="Message"
          titleOption="Select a language"
        />
      </div>
    </div>
  );
};
