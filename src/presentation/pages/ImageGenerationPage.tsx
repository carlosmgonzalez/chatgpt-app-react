import { useState } from "react";
// import { GptMessage } from "../components/chat/GptMessage";
import { MyMessage } from "../components/chat/MyMessage";
import { MessageBox } from "../components/chat/MessageBox";
import { TypingLoader } from "../components/chat/TypingLoader";
import { imageGenerationUseCase } from "../../core/use-cases/image-generation.use-case";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  };
}

export const ImageGenerationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handlePost = async (text: string) => {
    setIsLoading(true);

    setMessages((prevMsg) => [...prevMsg, { isGpt: false, text }]);

    const response = await imageGenerationUseCase(text);

    if (!response.ok) {
      setError("Something went wrong, see the logs");
      setIsLoading(false);
      return;
    }

    setMessages((prevMsg) => [
      ...prevMsg,
      {
        isGpt: true,
        text: response.alt,
        info: { imageUrl: response.url, alt: response.alt },
      },
    ]);

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
              // <GptMessage text={message.text} key={i} />
              <div className="col-start-1 col-end-8">
                <img
                  src={message.info?.imageUrl}
                  alt={message.info?.alt}
                  className="aspect-auto w-[300px] rounded-md"
                />
              </div>
            ) : (
              <MyMessage text={message.text} key={i} />
            )
          )}
          {isLoading && <TypingLoader />}
        </div>
      </div>
      <MessageBox onSendMessage={handlePost} placeholder="Message" />
    </div>
  );
};
