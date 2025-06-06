import { useRef, useState } from "react";
import { MessageBox } from "../components/chat/MessageBox";
import { TypingLoader } from "../components/chat/TypingLoader";
import { prosConsStreamUseCase } from "../../core/use-cases/pros-cons-stream.use-case";
import { ErrorAlert } from "../components/alerts/ErrorAlert";
import { MessagesList } from "../components/chat/MessagesList";

interface Message {
  text: string;
  isGpt: boolean;
}

export const ProsConsStreamPage = () => {
  const abortController = useRef(new AbortController());
  const isRunning = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handlePost = async (text: string) => {
    if (isRunning.current) {
      abortController.current.abort();
      abortController.current = new AbortController();
    }

    setIsLoading(true);
    isRunning.current = true;
    setMessages((prevMsg) => [...prevMsg, { isGpt: false, text }]);

    setMessages((prevMsg) => [...prevMsg, { isGpt: true, text: "" }]);
    let streamMessage = "";

    setIsLoading(false);
    const response = await prosConsStreamUseCase(
      text,
      abortController.current.signal,
      (chunk) => {
        streamMessage += chunk;
        setMessages((prevMsg) => {
          const newMessages = [...prevMsg];
          newMessages[newMessages.length - 1].text = streamMessage;
          return newMessages;
        });
      }
    );

    if (!response.ok && !isRunning.current) {
      setError("Something went wrong");
      setIsLoading(false);
      return;
    }

    isRunning.current = false;
    setError(null);
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
      <div className="message-box-px">
        <MessageBox onSendMessage={handlePost} placeholder="Message" />
      </div>
    </div>
  );
};
