import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type StepStore = {
  step: number;
  next: () => void;
  previous: () => void;
  isHydrated: boolean;
  setHydrated: () => void;
  defaultStep: () => void;
};

const useStepStore = create<StepStore>()(
  persist(
    (set) => ({
      step: 0,
      next: () => set((state) => ({ step: state.step + 1 })),
      previous: () => set((state) => ({ step: Math.max(0, state.step - 1) })),
      isHydrated: false,
      setHydrated: () => set({ isHydrated: true }),
      defaultStep: () => set({ step: 0 }),
    }),
    {
      name: "step",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated();
        }
      },
    }
  )
);

export default useStepStore;
