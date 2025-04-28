import { useState } from "react";
import { GptMessage } from "../components/chat/GptMessage";
import { MyMessage } from "../components/chat/MyMessage";
import { TypingLoader } from "../components/chat/TypingLoader";
import { translateUseCase } from "../../core/use-cases/translate.use-case";
import { MessageBoxSelect } from "../components/chat/MessageBoxSelect";
import { ErrorAlert } from "../components/alerts/ErrorAlert";

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
          {messages.map((message, i) =>
            message.isGpt ? (
              <GptMessage text={message.text} key={i} />
            ) : (
              <MyMessage text={message.text} key={i} />
            )
          )}
          {isLoading && <TypingLoader />}
        </div>
      </div>
      <div className="px-10">
        <MessageBoxSelect
          options={langOptions}
          onSendMessage={handlePost}
          placeholder="Translate message"
          titleOption="Select a language"
        />
      </div>
    </div>
  );
};
