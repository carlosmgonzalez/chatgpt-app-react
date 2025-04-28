import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SendHorizonal } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

type Option = {
  id: string;
  text: string;
};

interface Props {
  onSendMessage: (message: string, selectedOption: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  options: Option[];
  titleOption: string;
}

export const MessageBoxSelect = ({
  onSendMessage,
  placeholder,
  disableCorrections = false,
  options,
  titleOption,
}: Props) => {
  const [message, setMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState(options[0].text);
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
    const option = options.find((opt) => opt.id === selectedOption)?.text;

    if (message.trim().length === 0 || !option) return;

    onSendMessage(message, option);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row w-full items-center gap-2 pl-5 py-2 pr-2 rounded-lg bg-neutral-300/50 mb-8"
    >
      <div className="grow items-center justify-center">
        <div className="relative w-full">
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
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {options.find((opt) => opt.id === selectedOption)?.text || "Open"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{titleOption}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={selectedOption}
            onValueChange={setSelectedOption}
          >
            {options.map((option) => (
              <DropdownMenuRadioItem value={option.id} key={option.id}>
                {option.text}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <button
        type="submit"
        className="justify-center items-center rounded-full p-2 hover:bg-neutral-300/50 hover:opacity-90"
      >
        <SendHorizonal />
      </button>
    </form>
  );
};
