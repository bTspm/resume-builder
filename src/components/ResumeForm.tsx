// Modified ResumeForm.tsx
import React from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { AIProviderType } from "../types/ai-provider";
import ProviderSelection from './ProviderSelection';
import TechStackSelection from './TechStackSelection';

interface ResumeFormProps {
  jobDescription: string;
  selectedProviders: Set<AIProviderType>;
  selectedStack: string;
  includeCoverLetter: boolean;
  onJobDescriptionChange: (value: string) => void;
  onToggleProvider: (provider: AIProviderType) => void;
  onStackChange: (stack: string) => void;
  onToggleCoverLetter: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const ResumeForm: React.FC<ResumeFormProps> = (
  {
    jobDescription,
    selectedProviders,
    selectedStack,
    includeCoverLetter,
    onJobDescriptionChange,
    onToggleProvider,
    onStackChange,
    onToggleCoverLetter,
    onGenerate,
    isGenerating
  }
) => {
  return (
    <Box
      sx={ {
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
      } }
    >
      <Paper
        sx={ {
          p: 4,
          width: '100%',
          maxWidth: 'md'
        } }
      >
        <Typography variant="h4" gutterBottom align="center">Resume Generator</Typography>

        <Typography sx={ {mb: 3} } variant="subtitle1" gutterBottom align="center">
          Select AI providers and paste your job description below
        </Typography>

        <Box>
          <TechStackSelection selectedStack={ selectedStack } onStackChange={ onStackChange } />
        </Box>

        <Box>
          <ProviderSelection selectedProviders={ selectedProviders } onToggleProvider={ onToggleProvider } />
        </Box>

        <Box>
          <FormControlLabel
            control={ <Checkbox checked={ includeCoverLetter } onChange={ onToggleCoverLetter } color="primary" /> }
            label="Generate Cover Letter"
          />
        </Box>

        <TextField
          fullWidth
          multiline
          rows={ 6 }
          placeholder="Paste job description here..."
          value={ jobDescription }
          onChange={ (e) => onJobDescriptionChange(e.target.value) }
          margin="normal"
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={ onGenerate }
          disabled={ !jobDescription.trim() || selectedProviders.size === 0 || isGenerating }
          sx={ {mt: 3} }
        >
          { isGenerating
            ? 'Generating...'
            : selectedProviders.size > 0
              ? `Generate with ${ selectedProviders.size } Provider${ selectedProviders.size > 1 ? 's' : '' }`
              : 'Select Providers to Generate'
          }
        </Button>
      </Paper>
    </Box>
  );
};

export default ResumeForm;
