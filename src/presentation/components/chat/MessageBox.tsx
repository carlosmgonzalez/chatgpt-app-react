import { FormEvent, useEffect, useRef, useState } from "react";
import { SendHorizonal } from "lucide-react";

interface Props {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
}

export const MessageBox = ({
  onSendMessage,
  placeholder,
  disableCorrections = false,
}: Props) => {
  const [message, setMessage] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextAreaHeight = () => {
    const textarea = textAreaRef.current;
    if (textarea) {
      textarea.style.height = "0px";
      const scrollHeight = textarea.scrollHeight;
      // Limitamos a 150px máximo
      textarea.style.height = `${Math.min(scrollHeight, 150)}px`;
    }
  };

  useEffect(() => {
    adjustTextAreaHeight();
  }, [message]);

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim().length === 0) return;
    console.log(message);
    onSendMessage(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row w-full gap-2 pl-5 py-2 pr-2 rounded-lg bg-neutral-300/50 mb-8"
    >
      <div className="w-full">
        <textarea
          placeholder={placeholder}
          ref={textAreaRef}
          autoFocus
          name="message"
          rows={1}
          className={`flex w-full min-h-[40px] max-h-[160px] border-0 pt-2 text-neutral-900 placeholder-neutral-600
              focus:outline-none focus:border-neutral-700 resize-none overflow-auto no-scrollbar`}
          autoComplete={disableCorrections ? "off" : "on"}
          autoCorrect={disableCorrections ? "off" : "on"}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
      </div>
      <button
        type="submit"
        className="justify-center items-center rounded-full p-2 hover:bg-neutral-300/50 hover:opacity-90"
      >
        <SendHorizonal />
      </button>
    </form>
  );
};
