export const ErrorAlert = ({ error }: { error: string }) => {
  return (
    <div className="flex p-2 w-full rounded-md bg-red-300 justify-center items-center">
      <p className="text-red-500/90 font-semibold m-0">
        {error || "Something went wrong while send the message"}
      </p>
    </div>
  );
};
