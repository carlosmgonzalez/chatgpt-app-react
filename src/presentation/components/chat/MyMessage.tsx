export const MyMessage = ({ text }: { text: string }) => {
  return (
    <div className="col-start-6 col-end-13 p-1 rounded-md">
      <div className="flex items-start flex-row-reverse gap-2">
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-900 shrink-0">
          <span className="font-semibold text-sm">M</span>
        </div>
        <div className="relative text-sm bg-black/25 shadow rounded-md px-2 py-2">
          {/* <Markdown>{text}</Markdown> */}
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};
