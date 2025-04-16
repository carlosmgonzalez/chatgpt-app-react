import { useState } from "react";
import { GptMessage } from "../components/chat/GptMessage";
import { MyMessage } from "../components/chat/MyMessage";
import { TypingLoader } from "../components/chat/TypingLoader";
import { translateUseCase } from "../../core/use-cases/translate.use-case";
import { MessageBoxSelect } from "../components/chat/MessageBoxSelect";

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
    <div className="chat-container">
      <div className="chat-messages">
        {error && (
          <div className="flex p-2 w-full rounded-md bg-red-300 justify-center items-center">
            <p className="text-red-500 font-semibold m-0">{error}</p>
          </div>
        )}
        <div className="grid grid-cols-12 gap-y-2">
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
      <MessageBoxSelect
        options={langOptions}
        onSendMessage={handlePost}
        placeholder="Translate message"
      />
    </div>
  );
};
