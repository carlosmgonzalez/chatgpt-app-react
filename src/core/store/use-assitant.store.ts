import { create } from "zustand";
import { createThreadUseCase } from "../use-cases/create-thread.use-case";
import {
  loadMessagesUseCase,
  Messages,
} from "../use-cases/load-messages.use-case";
import { createJSONStorage, persist } from "zustand/middleware";
import { askTheAssistantUseCase } from "../use-cases/ask-the-assistant.use-case";

interface AssistantState {
  threadId: string | null;
  messages: Messages[];
}

interface StoreAssistantState {
  state: AssistantState;
  setState: (newState: Partial<AssistantState>) => void;
  createThreadId: () => void;
  loadMessages: () => void;
  askTheAssistant: (question: string) => Promise<void>;
}

export const useAssistantStore = create<StoreAssistantState>()(
  persist(
    (set, get) => ({
      state: {
        threadId: null,
        messages: [],
      },
      setState: (newState) =>
        set((store) => ({ state: { ...store.state, ...newState } })),
      createThreadId: async () => {
        if (get().state.threadId) return;

        const res = await createThreadUseCase();

        if (res.ok) {
          set((store) => ({
            state: { ...store.state, threadId: res.thread!.id },
          }));
        }
      },
      loadMessages: async () => {
        const threadId = get().state.threadId;
        if (!threadId) return;

        const res = await loadMessagesUseCase(threadId);

        if (res.ok) {
          set((store) => ({
            state: { ...store.state, messages: res.messages! },
          }));
        }
      },
      askTheAssistant: async (question) => {
        const threadId = get().state.threadId;
        if (!threadId) return;

        const res = await askTheAssistantUseCase(question, threadId);

        if (res.ok) {
          set((store) => ({
            state: { ...store.state, messages: res.messages! },
          }));
        }
      },
    }),
    {
      name: "assistant-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
