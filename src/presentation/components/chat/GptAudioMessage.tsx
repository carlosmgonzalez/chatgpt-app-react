interface Props {
  audio: string;
}

export const GptAudioMessage = ({ audio }: Props) => {
  return (
    <div className="col-start-1 col-end-9 p-1 rounded-md">
      <div className="flex flex-row items-start gap-2">
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-sky-900 shrink-0">
          <span className="font-semibold text-sm">G</span>
        </div>
        <div className="text-sm bg-black/25 shadow rounded-md px-2 py-2">
          <audio controls src={audio} color="transparent" />
        </div>
      </div>
    </div>
  );
};
