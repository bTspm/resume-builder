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
  Divider
} from '@mui/material';
import {
  ContentCopy as ContentCopyIcon,
  Download as DownloadIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { AIProviderInfo } from "../types/ai-provider.ts";
import { GeneratedResume } from "../types/project.ts";

interface ResumeResultCardProps {
  provider: AIProviderInfo;
  resume: GeneratedResume | null;
  error: string | null;
  isGenerating: boolean;
  onCopy: (text: string) => void;
  onDownload: (resume: GeneratedResume) => void;
}

const ResumeResultCard: React.FC<ResumeResultCardProps> = ({
                                                             provider,
                                                             resume,
                                                             error,
                                                             isGenerating,
                                                             onCopy,
                                                             onDownload,
                                                           }) => {

  return (
    <Paper variant="outlined">
      {/* Header */}
      <Box p={3}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {provider.name}
          </Typography>
          {isGenerating ? (
            <CircularProgress size={24} />
          ) : resume ? (
            <CheckCircleIcon color="success" />
          ) : error ? (
            <ErrorIcon color="error" />
          ) : null}
        </Stack>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {/* Resume Content */}
        {resume && (
          <Stack spacing={3} mt={3}>
            {/* Summary */}
            <Paper variant="outlined">
              <Box p={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Professional Summary
                  </Typography>
                  <IconButton size="small" onClick={() => onCopy(resume.summary)}>
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Stack>
                <Typography>{resume.summary}</Typography>
              </Box>
            </Paper>

            {/* Projects */}
            <div>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Key Achievements
              </Typography>
              <Stack spacing={2}>
                {resume.projects.map((project, index) => (
                  <Paper key={index} variant="outlined">
                    <Box p={2}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="subtitle2" fontWeight="medium">
                          {project.name}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => onCopy(project.selected_achievements.join('\n'))}
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                      <List dense disablePadding>
                        {project.selected_achievements.map((achievement, i) => (
                          <ListItem key={i}>
                            <ListItemText primary={achievement} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </div>

            {/* Actions */}
            <div>
              <Divider />
              <Stack direction="row" spacing={2} mt={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<ContentCopyIcon />}
                  onClick={() => onCopy(
                    `${resume.summary}\n\n${
                      resume.projects
                        .map(p => `${p.name}\n${p.selected_achievements.join('\n')}`)
                        .join('\n\n')
                    }`
                  )}
                >
                  Copy All
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => onDownload(resume)}
                >
                  Download
                </Button>
              </Stack>
            </div>
          </Stack>
        )}

        {/* Loading State */}
        {isGenerating && (
          <Box textAlign="center" py={8}>
            <CircularProgress size={40} sx={{ mb: 2 }} />
            <Typography>
              Generating your resume...
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default ResumeResultCard;
