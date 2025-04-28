import { AudioLines, FileVolume, SendHorizonal } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

interface Props {
  onSendMessage: (message: string, audioFile: File) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  accept?: string;
}

export const MessageBoxFile = ({
  onSendMessage,
  placeholder,
  disableCorrections = false,
  accept,
}: Props) => {
  const [message, setMessage] = useState("");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
    if (!selectedFile) return;

    let correctMimeType = selectedFile.type;
    if (selectedFile.type === "audio/x-m4a") {
      correctMimeType = "audio/m4a";
    }

    const audioFile = new File([selectedFile], selectedFile.name, {
      type: correctMimeType,
    });

    onSendMessage(message, audioFile);
    setSelectedFile(null);
    setMessage("");
  };

  const onPress = () => {
    inputFileRef.current?.click();
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row w-full gap-2 py-2 px-2 rounded-lg bg-neutral-300/50 mb-8"
    >
      <button
        onClick={onPress}
        type="button"
        className="justify-center items-center rounded-full p-2 hover:bg-neutral-300/50 hover:opacity-90"
      >
        <FileVolume />
      </button>
      <input
        type="file"
        className="hidden"
        ref={inputFileRef}
        accept={accept}
        onChange={(e) => setSelectedFile(e.target.files?.item(0) || null)}
      />
      <div className="grow">
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
      {selectedFile && (
        <div className="justify-center items-center flex gap-2 rounded-lg px-2 py-1 bg-neutral-300/50">
          <AudioLines />
          <span className="self-center font-medium">{`${selectedFile.name.slice(
            0,
            15
          )}`}</span>
        </div>
      )}
      <button
        type="submit"
        className="justify-center items-center rounded-full p-2 hover:bg-neutral-300/50 hover:opacity-90"
      >
        <SendHorizonal />
      </button>
    </form>
  );
};
