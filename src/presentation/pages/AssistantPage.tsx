import { useEffect, useState } from "react";
import { GptMessage } from "../components/chat/GptMessage";
import { MyMessage } from "../components/chat/MyMessage";
import { TypingLoader } from "../components/chat/TypingLoader";
import { MessageBox } from "../components/chat/MessageBox";
import { useAssistantStore } from "../../core/store/use-assitant.store";

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

  const handleNewMessage = () => {
    setState({ threadId: null, messages: [] });
    createThreadId();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-full overflow-x-auto px-2">
        <button
          onClick={handleNewMessage}
          type="button"
          className="flex gap-2 items-center self-start px-2 py-1 bg-white hover:bg-neutral-300 text-black rounded-md font-semibold"
        >
          <i className="fa-regular fa-message" />
          New Chat
        </button>
        {error && (
          <div className="flex p-2 w-full rounded-md bg-red-300 justify-center items-center">
            <p className="text-red-500 font-semibold m-0">{error}</p>
          </div>
        )}
        <div className="grid grid-cols-12 gap-y-2 mb-3">
          {state.messages.map((message, i) =>
            message.role === "assistant" ? (
              <GptMessage text={message.content.value} key={i} />
            ) : (
              <MyMessage text={message.content.value} key={i} />
            )
          )}
        </div>
        {isLoading && <TypingLoader />}
      </div>
      <MessageBox onSendMessage={handlePost} placeholder="Message" />
    </div>
  );
};
