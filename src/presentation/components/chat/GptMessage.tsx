// import Markdown from "react-markdown";

export const GptMessage = ({ text }: { text: string }) => {
  return (
    <div className="col-start-1 col-end-8 p-1 rounded-md">
      <div className="flex flex-row items-start gap-2">
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-sky-900 shrink-0">
          <span className="font-semibold text-sm">G</span>
        </div>
        <div className="relative text-sm bg-black/25 shadow rounded-md px-2 py-2">
          {/* <Markdown>{text}</Markdown> */}
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};
