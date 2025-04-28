import { Separator } from "@/components/ui/separator";
import { GptMessage } from "./GptMessage";
import { MyMessage } from "./MyMessage";

interface Message {
  text: string;
  isGpt: boolean;
}

interface Props {
  message: Message;
}

export const MessagesList = ({ message }: Props) => {
  return (
    <>
      {message.isGpt ? (
        <>
          <Separator className="col-start-1 col-end-13" />
          <GptMessage text={message.text} />
        </>
      ) : (
        <MyMessage text={message.text} />
      )}
    </>
  );
};
