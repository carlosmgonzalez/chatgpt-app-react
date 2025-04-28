import { Separator } from "@/components/ui/separator";
import { Messages } from "@/core/use-cases/load-messages.use-case";
import { GptMessage } from "./GptMessage";
import { MyMessage } from "./MyMessage";

interface Props {
  message: Messages;
}

export const ThreadMessages = ({ message }: Props) => {
  return (
    <>
      {message.role === "assistant" ? (
        <>
          <Separator className="col-start-1 col-end-13" />
          <GptMessage text={message.content.value} />
        </>
      ) : (
        <MyMessage text={message.content.value} />
      )}
    </>
  );
};
