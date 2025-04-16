import { useState } from "react";
import { GptMessage } from "../components/chat/GptMessage";
import { MyMessage } from "../components/chat/MyMessage";
import { MessageBox } from "../components/chat/MessageBox";
import { TypingLoader } from "../components/chat/TypingLoader";
import { orthographyUseCase } from "../../core/use-cases/orthography.use-case";

interface Message {
  text: string;
  isGpt: boolean;
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handlePost = async (text: string) => {
    setIsLoading(true);

    setMessages((prevMsg) => [...prevMsg, { isGpt: false, text }]);

    const response = await orthographyUseCase(text);

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
      <MessageBox
        onSendMessage={handlePost}
        placeholder="Check your orthography "
      />
      {/* <MessageBoxFile onSendMessage={handlePost} /> */}
      {/* <MessageBoxSelect
        onSendMessage={handlePost}
        options={[
          { id: "1", text: "hola" },
          { id: "2", text: "mundo" },
        ]}
      /> */}
    </div>
  );
};
