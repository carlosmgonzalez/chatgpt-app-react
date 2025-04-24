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
      className="flex flex-row gap-2 p-2 rounded-md bg-black/50 w-full"
    >
      <button
        onClick={onPress}
        type="button"
        className="flex items-center justify-center self text-white hover:text-neutral-400 mr-2"
      >
        <i className="fa-solid fa-paperclip text-xl" />
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
            className={`flex w-full min-h-[40px] max-h-[160px] border-0 pt-2 text-neutral-400 
              focus:outline-none focus:border-neutral-700 resize-none overflow-auto no-scrollbar`}
            autoComplete={disableCorrections ? "off" : "on"}
            autoCorrect={disableCorrections ? "off" : "on"}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </div>
      </div>
      {selectedFile && (
        <div className="justify-center items-center flex gap-2 p-1 border-1 rounded-md border-neutral-800">
          <i className="fa-regular fa-floppy-disk" />
          <span className="self-center">{`${selectedFile.name.slice(
            0,
            15
          )}`}</span>
        </div>
      )}
      <button
        type="submit"
        className="justify-center items-center w-10 h-10 bg-neutral-200 font-bold rounded-full  hover:bg-neutral-400"
      >
        <i className="fa-regular fa-paper-plane text-black" />
      </button>
    </form>
  );
};
