// Modified resumeStore.ts
import { create } from 'zustand';
import { GeneratedResume } from "../types/project";
import { AIProviderType, AI_PROVIDERS } from "../types/ai-provider";

interface ProviderResult {
  resume: GeneratedResume | null;
  error: string | null;
  isGenerating: boolean;
}

type ProviderResults = {
  [K in AIProviderType]: ProviderResult;
};

interface ResumeStore {
  jobDescription: string;
  providers: ProviderResults;
  selectedProviders: Set<AIProviderType>;
  selectedStack: string;
  includeCoverLetter: boolean;
  setJobDescription: (description: string) => void;
  setProviderResult: (provider: AIProviderType, result: Partial<ProviderResult>) => void;
  toggleProvider: (provider: AIProviderType) => void;
  setSelectedStack: (stack: string) => void;
  toggleCoverLetter: () => void;
  resetResults: () => void;
}

const initialProviderState: ProviderResult = {
  resume: null,
  error: null,
  isGenerating: false,
};

const initialProviders = AI_PROVIDERS.reduce((acc, provider) => ({
  ...acc,
  [provider.id]: { ...initialProviderState }
}), {} as ProviderResults);

export const useResumeStore = create<ResumeStore>((set) => ({
  jobDescription: '',
  providers: initialProviders,
  selectedProviders: new Set(['claude']),
  selectedStack: 'java',
  includeCoverLetter: false,

  setJobDescription: (description) => set({ jobDescription: description }),

  setProviderResult: (provider, result) => {
    set((state) => ({
      providers: {
        ...state.providers,
        [provider]: {
          ...state.providers[provider],
          ...result,
        },
      },
    }));
  },

  toggleProvider: (provider) => {
    set((state) => {
      const newSelected = new Set(state.selectedProviders);
      if (newSelected.has(provider)) {
        newSelected.delete(provider);
      } else {
        newSelected.add(provider);
      }
      return { selectedProviders: newSelected };
    });
  },

  setSelectedStack: (stack) => set({ selectedStack: stack }),

  toggleCoverLetter: () => set((state) => ({
    includeCoverLetter: !state.includeCoverLetter
  })),

  resetResults: () => {
    set({ providers: initialProviders });
  },
}));
