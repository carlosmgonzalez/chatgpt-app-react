import { useState } from "react";
import { MyMessage } from "../components/chat/MyMessage";
import { TypingLoader } from "../components/chat/TypingLoader";
import { MessageBoxSelect } from "../components/chat/MessageBoxSelect";
import { textToAudioUseCase } from "../../core/use-cases/text-to-audio.use-case";
import { GptAudioMessage } from "../components/chat/GptAudioMessage";
import { ErrorAlert } from "../components/alerts/ErrorAlert";

interface Message {
  text: string;
  isGpt: boolean;
}

const voices = [
  "alloy",
  "ash",
  "ballad",
  "coral",
  "echo",
  "fable",
  "onyx",
  "nova",
  "sage",
  "shimmer",
  "verse",
];

const options = voices.map((voice, i) => ({
  id: `${i}`,
  text: voice,
}));

export const TextToAudioPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handlePost = async (text: string, selectedOption: string) => {
    setIsLoading(true);
    setMessages((prevMsg) => [...prevMsg, { isGpt: false, text }]);

    const response = await textToAudioUseCase(text, selectedOption);

    if (!response.ok) {
      setError("Something went wrong");
      setIsLoading(false);
      return;
    }

    const { audioUrl } = response;
    setMessages((prevMsg) => [...prevMsg, { isGpt: true, text: audioUrl! }]);

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
              <GptAudioMessage audio={message.text} key={i} />
            ) : (
              <MyMessage text={message.text} key={i} />
            )
          )}
          {isLoading && <TypingLoader />}
        </div>
      </div>
      <div className="message-box-px">
        <MessageBoxSelect
          options={options}
          onSendMessage={handlePost}
          placeholder="Message"
          titleOption="Select a voice"
        />
      </div>
    </div>
  );
};
