import { useState } from "react";
import { MessageBox } from "../components/chat/MessageBox";
import { TypingLoader } from "../components/chat/TypingLoader";
import { prosConsUseCase } from "../../core/use-cases/pros-cons.use-case";
import { ErrorAlert } from "../components/alerts/ErrorAlert";
import { MessagesList } from "../components/chat/MessagesList";

interface Message {
  text: string;
  isGpt: boolean;
}

export const ProsConsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handlePost = async (text: string) => {
    setIsLoading(true);

    setMessages((prevMsg) => [...prevMsg, { isGpt: false, text }]);

    const response = await prosConsUseCase(text);

    if (!response.ok) {
      setError(response.message);
      setIsLoading(false);
      return;
    }

    setError(null);

    setMessages((prevMsg) => [
      ...prevMsg,
      { isGpt: true, text: response.message },
    ]);

    setIsLoading(false);
  };

  return (
    <div className="chat-container-page">
      <div className="chat-container">
        {error && <ErrorAlert error={error} />}
        <div className="chat-messages">
          {messages.map((message, i) => (
            <MessagesList message={message} key={i} />
          ))}
          {isLoading && <TypingLoader />}
        </div>
      </div>
      <div className="px-10">
        <MessageBox
          onSendMessage={handlePost}
          placeholder="Message pros and cons"
        />
      </div>
    </div>
  );
};
