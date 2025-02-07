import React from 'react';
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box
} from '@mui/material';
import { AI_PROVIDERS, AIProviderType } from "../types/ai-provider.ts";

interface ProviderSelectionProps {
  selectedProviders: Set<AIProviderType>;
  onToggleProvider: (provider: AIProviderType) => void;
}

const ProviderSelection: React.FC<ProviderSelectionProps> = ({
                                                               selectedProviders,
                                                               onToggleProvider
                                                             }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <FormGroup row>
        {AI_PROVIDERS.map((provider) => (
          <FormControlLabel
            key={provider.id}
            control={
              <Checkbox
                checked={selectedProviders.has(provider.id)}
                onChange={() => onToggleProvider(provider.id)}
              />
            }
            label={provider.name}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default ProviderSelection;
