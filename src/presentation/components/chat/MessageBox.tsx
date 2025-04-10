import { FormEvent, useEffect, useRef, useState } from "react";

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
      className="flex flex-row gap-2 p-3 rounded-md bg-black/50 w-full"
    >
      <div className="grow">
        <div className="relative w-full">
          <textarea
            placeholder={placeholder}
            ref={textAreaRef}
            autoFocus
            name="message"
            rows={1}
            className={`flex w-full min-h-[40px] max-h-[160px] border rounded-md border-neutral-800 text-neutral-400 
              focus:outline-none focus:border-neutral-700 px-3 pb-2.5 pt-2 resize-none overflow-auto no-scrollbar`}
            autoComplete={disableCorrections ? "off" : "on"}
            autoCorrect={disableCorrections ? "off" : "on"}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </div>
      </div>
      <button
        type="submit"
        className="justify-center items-center w-10 h-10 bg-neutral-200 font-bold rounded-full  hover:bg-neutral-400"
      >
        <i className="fa-regular fa-paper-plane text-black" />
      </button>
    </form>
  );
};
