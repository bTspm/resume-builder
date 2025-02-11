import React from 'react';
import {
  Paper,
  Box,
  Typography,
  IconButton,
  Button,
  CircularProgress,
  Alert,
  Stack,
  List,
  ListItem,
  ListItemText,
  Divider,
  Collapse,
} from '@mui/material';
import {
  ContentCopy as ContentCopyIcon,
  Download as DownloadIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { AIProviderInfo } from "../types/ai-provider";
import { GeneratedResume } from "../types/project";
import RelevantAchievement from './RelevantAchievement';

interface ResumeResultCardProps {
  provider: AIProviderInfo;
  resume: GeneratedResume | null;
  error: string | null;
  isGenerating: boolean;
  onCopy: (text: string) => void;
  onDownload: (resume: GeneratedResume) => void;
}

const ResumeResultCard: React.FC<ResumeResultCardProps> = (
  {
    provider,
    resume,
    error,
    isGenerating,
    onCopy,
    onDownload,
  }
) => {
  const [coverLetterExpanded, setCoverLetterExpanded] = React.useState(false);

  const toggleCoverLetter = () => {
    setCoverLetterExpanded(!coverLetterExpanded);
  };

  return (
    <Paper variant="outlined">
      <Box p={ 3 }>
        {/* Header */ }
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            { provider.name }
          </Typography>
          { isGenerating ? (
            <CircularProgress size={ 24 } />
          ) : resume ? (
            <CheckCircleIcon color="success" />
          ) : error ? (
            <ErrorIcon color="error" />
          ) : null }
        </Stack>

        {/* Error Message */ }
        { error && (
          <Alert severity="error" sx={ {mt: 2} }>
            { error }
          </Alert>
        ) }

        {/* Resume Content */ }
        { resume && (
          <Stack spacing={ 3 } mt={ 3 }>
            {/* Professional Summary */ }
            <Paper variant="outlined">
              <Box p={ 2 }>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={ 1 }>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Professional Summary
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={ () => onCopy(resume.summary) }
                    aria-label="Copy summary"
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Stack>
                <Typography>{ resume.summary }</Typography>
              </Box>
            </Paper>

            {/* Cover Letter Section */ }
            { resume.cover_letter && (
              <Paper variant="outlined">
                <Box p={ 2 }>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" fontWeight="medium">
                      Cover Letter
                    </Typography>
                    <Stack direction="row" spacing={ 1 }>
                      <IconButton
                        size="small"
                        onClick={ () => onCopy(resume.cover_letter || '') }
                        aria-label="Copy cover letter"
                      >
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={ toggleCoverLetter }
                        aria-label="Toggle cover letter"
                      >
                        { coverLetterExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
                      </IconButton>
                    </Stack>
                  </Stack>
                  <Collapse in={ coverLetterExpanded }>
                    <Box mt={ 2 }>
                      <Typography style={ {whiteSpace: 'pre-line'} }>
                        { resume.cover_letter }
                      </Typography>
                    </Box>
                  </Collapse>
                </Box>
              </Paper>
            ) }

            {/* Projects and Achievements */ }
            <div>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Key Achievements
              </Typography>
              <Stack spacing={ 2 }>
                { resume.projects.map((project, projectIndex) => (
                  <Paper key={ projectIndex } variant="outlined">
                    <Box p={ 2 }>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={ 1 }>
                        <Typography variant="subtitle2" fontWeight="medium">
                          { project.name }
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={ () => onCopy(project.selected_achievements
                            .map(a => a.achievement)
                            .join('\n')) }
                          aria-label="Copy achievements"
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                      <List dense disablePadding>
                        { project.selected_achievements.map((achievement, achievementIndex) => (
                          <ListItem key={ achievementIndex }>
                            <ListItemText
                              primary={ <RelevantAchievement achievement={ achievement } /> }
                            />
                          </ListItem>
                        )) }
                      </List>
                    </Box>
                  </Paper>
                )) }
              </Stack>
            </div>

            {/* Actions */ }
            <div>
              <Divider />
              <Stack direction="row" spacing={ 2 } mt={ 2 }>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={ <ContentCopyIcon /> }
                  onClick={ () => onCopy(
                    `${ resume.summary }\n\n${
                      resume.projects
                        .map(p => `${ p.name }\n${ p.selected_achievements
                          .map(a => a.achievement)
                          .join('\n') }`)
                        .join('\n\n')
                    }${ resume.cover_letter ? `\n\nCover Letter:\n${ resume.cover_letter }` : '' }`
                  ) }
                >
                  Copy All
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={ <DownloadIcon /> }
                  onClick={ () => onDownload(resume) }
                >
                  Download
                </Button>
              </Stack>
            </div>
          </Stack>
        ) }

        {/* Loading State */ }
        { isGenerating && (
          <Box textAlign="center" py={ 8 }>
            <CircularProgress size={ 40 } sx={ {mb: 2} } />
            <Typography>
              Generating your resume...
            </Typography>
          </Box>
        ) }
      </Box>
    </Paper>
  );
};

export default ResumeResultCard;
