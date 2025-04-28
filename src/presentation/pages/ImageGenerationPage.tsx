import { useState } from "react";
// import { GptMessage } from "../components/chat/GptMessage";
import { MyMessage } from "../components/chat/MyMessage";
import { MessageBox } from "../components/chat/MessageBox";
import { TypingLoader } from "../components/chat/TypingLoader";
import { imageGenerationUseCase } from "../../core/use-cases/image-generation.use-case";
import { ErrorAlert } from "../components/alerts/ErrorAlert";

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
    <div className="chat-container-page">
      <div className="chat-container">
        {error && <ErrorAlert error={error} />}
        <div className="chat-messages">
          {messages.map((message, i) =>
            message.isGpt ? (
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
      <div className="message-box-px">
        <MessageBox onSendMessage={handlePost} placeholder="Message" />
      </div>
    </div>
  );
};
