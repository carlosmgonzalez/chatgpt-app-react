import { useState } from "react";
import { MyMessage } from "../components/chat/MyMessage";
import { TypingLoader } from "../components/chat/TypingLoader";
import { MessageBoxFile } from "../components/chat/MessageBoxFile";
import { audioToTextUseCase } from "../../core/use-cases/audio-to-text.use-case";
import { GptMessage } from "../components/chat/GptMessage";

interface Message {
  text: string;
  isGpt: boolean;
}

export const AudioToTextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handlePost = async (prompt: string, audioFile: File) => {
    setIsLoading(true);
    setMessages((prevMsg) => [
      ...prevMsg,
      {
        isGpt: false,
        text: prompt.trim().length === 0 ? prompt : audioFile.name,
      },
    ]);

    const response = await audioToTextUseCase(prompt, audioFile);

    if (!response.ok) {
      setError("Something went wrong");
      setIsLoading(false);
      return;
    }

    const { message } = response;
    setMessages((prevMsg) => [...prevMsg, { isGpt: true, text: message! }]);

    setIsLoading(false);
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
      <MessageBoxFile
        onSendMessage={handlePost}
        placeholder="Audio to message"
        accept="audio/*"
      />
    </div>
  );
};
