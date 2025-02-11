// Modified ResumeGenerator.tsx
import React from 'react';
import { Container, Snackbar, Grid } from '@mui/material';
import { ResumeGeneratorService } from "../services/resumeGenerator";
import { useResumeStore } from "../store/resumeStore";
import { AIProviderType } from "../types/ai-provider";
import { GeneratedResume } from "../types/project";
import { ProjectLoader } from "../utils/projectLoader";
import ResumeForm from './ResumeForm';
import ResumeResultCard from './ResumeResultCard';

const ResumeGenerator: React.FC = () => {
  const {
    jobDescription,
    providers,
    selectedProviders,
    selectedStack,
    includeCoverLetter,
    setJobDescription,
    setProviderResult,
    toggleProvider,
    setSelectedStack,
    toggleCoverLetter,
    resetResults,
  } = useResumeStore();

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleShowMessage = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      handleShowMessage('Please provide a job description');
      return;
    }

    if (selectedProviders.size === 0) {
      handleShowMessage('Please select at least one AI provider');
      return;
    }

    resetResults();

    const generateForProvider = async (providerId: AIProviderType) => {
      console.log(`Generating for provider: ${providerId}`);
      setProviderResult(providerId, { isGenerating: true, error: null });

      try {
        const resumeData = await ProjectLoader.loadResumeData(selectedStack);
        console.log('Loaded resume data:', {
          projectsCount: resumeData.projects.length,
          hasProjects: Boolean(resumeData.projects),
          projectNames: resumeData.projects.map(p => p.name)
        });

        const generator = new ResumeGeneratorService(providerId);
        const optimizedResume = await generator.generateResume(
          resumeData,
          jobDescription,
          includeCoverLetter
        );
        setProviderResult(providerId, { resume: optimizedResume, isGenerating: false });
      } catch (err: any) {
        console.error(`Error generating for ${providerId}:`, err);
        setProviderResult(providerId, {
          error: err.message || `Failed to generate with ${providerId}`,
          isGenerating: false
        });
      }
    };

    try {
      await Promise.all(Array.from(selectedProviders).map(generateForProvider));
    } catch (error) {
      console.error('Generation error:', error);
      handleShowMessage('An error occurred during generation');
    }
  };

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      handleShowMessage('Copied to clipboard');
    } catch (err) {
      handleShowMessage('Failed to copy to clipboard');
    }
  };

  const handleDownload = (resume: GeneratedResume, providerId: string) => {
    const content = [
      'Professional Summary:',
      resume.summary,
      '',
      resume.projects.map(project =>
        `${project.name}\n\n${project.selected_achievements.map(a => a.achievement).join('\n')}`
      ).join('\n\n'),
      '',
      resume.cover_letter ? `Cover Letter:\n${resume.cover_letter}` : ''
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume_${providerId}_${new Date().toISOString()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <ResumeForm
        jobDescription={jobDescription}
        selectedProviders={selectedProviders}
        selectedStack={selectedStack}
        includeCoverLetter={includeCoverLetter}
        onJobDescriptionChange={setJobDescription}
        onToggleProvider={toggleProvider}
        onStackChange={setSelectedStack}
        onToggleCoverLetter={toggleCoverLetter}
        onGenerate={handleGenerate}
        isGenerating={Object.values(providers).some(p => p.isGenerating)}
      />

      {Object.entries(providers).some(([_, data]) => data.resume || data.isGenerating) && (
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {Array.from(selectedProviders).map(providerId => {
            const provider = { id: providerId, name: providerId === 'claude' ? 'Claude AI' : 'GPT-4' };
            const providerData = providers[providerId];

            return (
              <Grid item xs={12} md={6} key={provider.id}>
                <ResumeResultCard
                  provider={provider}
                  resume={providerData.resume}
                  error={providerData.error}
                  isGenerating={providerData.isGenerating}
                  onCopy={handleCopyToClipboard}
                  onDownload={(resume) => handleDownload(resume, providerId)}
                />
              </Grid>
            );
          })}
        </Grid>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  );
};

export default ResumeGenerator;
