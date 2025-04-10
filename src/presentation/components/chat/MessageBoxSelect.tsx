import { FormEvent, useState } from "react";

type Option = {
  id: string;
  text: string;
};

interface Props {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  options: Option[];
}

export const MessageBoxSelect = ({
  onSendMessage,
  placeholder,
  disableCorrections = false,
  options,
}: Props) => {
  const [message, setMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

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
      <select
        name="select"
        className="border border-neutral-800 rounded-md text-white focus:outline-none h-10 px-2"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        {options.map((option) => (
          <option className="bg-black" key={option.id} value={option.text}>
            {option.text}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="justify-center items-center w-10 h-10 bg-neutral-200 font-bold rounded-full  hover:bg-neutral-400"
      >
        <i className="fa-regular fa-paper-plane text-black" />
      </button>
    </form>
  );
};
