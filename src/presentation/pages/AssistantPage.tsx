import { useEffect, useState } from "react";
import { TypingLoader } from "../components/chat/TypingLoader";
import { MessageBox } from "../components/chat/MessageBox";
import { useAssistantStore } from "../../core/store/use-assitant.store";
import { ThreadMessages } from "../components/chat/ThreadMessages";
import { ErrorAlert } from "../components/alerts/ErrorAlert";

export const AssistantPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { createThreadId, loadMessages, state, askTheAssistant, setState } =
    useAssistantStore();

  useEffect(() => {
    createThreadId();
    loadMessages();
  }, [createThreadId, loadMessages]);

  const handlePost = async (question: string) => {
    setIsLoading(true);

    setState({
      messages: [
        ...state.messages,
        { role: "user", content: { value: question, annotations: [] } },
      ],
    });

    await askTheAssistant(question);

    setIsLoading(false);
    setError(null);
  };

  return (
    <div className="chat-container-page">
      <div className="chat-container">
        {error && <ErrorAlert error={error} />}
        <div className="chat-messages">
          {state.messages.map((message, i) => (
            <ThreadMessages message={message} key={i} />
          ))}
        </div>
        {isLoading && <TypingLoader />}
      </div>
      <div className="message-box-px">
        <MessageBox onSendMessage={handlePost} placeholder="Message" />
      </div>
    </div>
  );
};
