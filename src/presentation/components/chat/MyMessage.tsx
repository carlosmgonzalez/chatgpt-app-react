export const MyMessage = ({ text }: { text: string }) => {
  return (
    <div className="col-start-5 col-end-13">
      <div className="flex items-start flex-row-reverse">
        <div className="bg-neutral-300/50 px-4 py-3 rounded-lg">
          <span className="text-base">{text}</span>
        </div>
      </div>
    </div>
  );
};
