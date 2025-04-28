import Markdown from "react-markdown";

export const GptMessage = ({ text }: { text: string }) => {
  return (
    <div className="col-start-1 col-end-13">
      <div className="flex flex-row items-start gap-2">
        <div className="px-4 text-base">
          <Markdown>{text}</Markdown>
        </div>
      </div>
    </div>
  );
};
