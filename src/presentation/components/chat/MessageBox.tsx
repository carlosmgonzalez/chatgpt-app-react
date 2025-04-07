import { FormEvent, useState } from "react";

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
      className="flex flex-row gap-2 items-center h-16 rounded-md bg-black/50 w-full px-4"
    >
      <div className="grow">
        <div className="relative w-full">
          <input
            type="text"
            placeholder={placeholder}
            autoFocus
            name="message"
            className="flex w-full border rounded-md border-neutral-800 text-neutral-400 focus:outline-none focus:border-neutral-500 pl-4 h-10"
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
