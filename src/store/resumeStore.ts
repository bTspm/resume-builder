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
  setJobDescription: (description: string) => void;
  setProviderResult: (provider: AIProviderType, result: Partial<ProviderResult>) => void;
  toggleProvider: (provider: AIProviderType) => void;
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

export const useResumeStore = create<ResumeStore>((set, get) => ({
  jobDescription: '',
  providers: initialProviders,
  selectedProviders: new Set(['claude']), // Default to Claude selected

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
    console.log('Provider result updated:', provider, result);
  },

  toggleProvider: (provider) => {
    set((state) => {
      const newSelected = new Set(state.selectedProviders);
      if (newSelected.has(provider)) {
        newSelected.delete(provider);
      } else {
        newSelected.add(provider);
      }
      console.log('Toggled provider:', provider, 'New selected:', newSelected);
      return { selectedProviders: newSelected };
    });
  },

  resetResults: () => {
    set({ providers: initialProviders });
    console.log('Results reset');
  },
}));
