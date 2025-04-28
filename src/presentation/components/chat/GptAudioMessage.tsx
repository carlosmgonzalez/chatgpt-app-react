interface Props {
  audio: string;
}

export const GptAudioMessage = ({ audio }: Props) => {
  return (
    <div className="col-start-1 col-end-10">
      <div className="flex flex-row items-start gap-2">
        <audio controls src={audio} color="transparent" />
      </div>
    </div>
  );
};
