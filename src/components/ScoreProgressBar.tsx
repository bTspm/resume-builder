import React from 'react';
import { Box, Tooltip, LinearProgress } from '@mui/material';
import ScoreTooltip from './ScoreTooltip';

interface ScoreProgressBarProps {
  score: number;  // Score can be between 0-1 or 0-100
}

const ScoreProgressBar: React.FC<ScoreProgressBarProps> = ({ score }) => {
  // Normalize score to percentage (0-100)
  const normalizeScore = (score: number): number => {
    // If score is already a percentage (>1), return as is
    if (score > 1) {
      return Math.min(score, 100);
    }
    // If score is decimal (0-1), convert to percentage
    return Math.min(score * 100, 100);
  };

  const percentageScore = normalizeScore(score);

  return (
    <Tooltip
      title={<ScoreTooltip score={score} />}
      placement="right"
      arrow
    >
      <Box sx={{ width: '100%', mr: 1, ml: 1 }}>
        <LinearProgress
          variant="determinate"
          value={percentageScore}
          sx={{
            height: 8,
            borderRadius: 5,
            backgroundColor: 'rgba(0,0,0,0.1)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: percentageScore >= 80
                ? '#4caf50'  // success
                : percentageScore >= 60
                  ? '#ff9800'  // warning
                  : '#f44336'  // error
            }
          }}
        />
      </Box>
    </Tooltip>
  );
};

export default ScoreProgressBar;
