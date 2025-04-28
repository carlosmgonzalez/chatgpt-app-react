import { useState } from "react";
import { MyMessage } from "../components/chat/MyMessage";
import { TypingLoader } from "../components/chat/TypingLoader";
import { MessageBoxSelect } from "../components/chat/MessageBoxSelect";
import { textToAudioUseCase } from "../../core/use-cases/text-to-audio.use-case";
import { GptAudioMessage } from "../components/chat/GptAudioMessage";

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
              <GptAudioMessage audio={message.text} key={i} />
            ) : (
              <MyMessage text={message.text} key={i} />
            )
          )}
          {isLoading && <TypingLoader />}
        </div>
      </div>
      <MessageBoxSelect
        options={options}
        onSendMessage={handlePost}
        placeholder="Message to audio"
        titleOption="Select a voice"
      />
    </div>
  );
};
