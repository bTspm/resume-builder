import React from 'react';
import { Box, Typography } from '@mui/material';

interface ScoreBreakdown {
  keywordMatch: number;
  technicalAlignment: number;
  seniorityMatch: number;
  impactScore: number;
}

interface ScoreTooltipProps {
  score: number;  // Score can be between 0-1 or 0-100
}

const ScoreTooltip: React.FC<ScoreTooltipProps> = ({ score }) => {
  // Normalize score to percentage
  const normalizeScore = (score: number): number => {
    return score > 1 ? Math.min(score, 100) : Math.min(score * 100, 100);
  };

  const percentageScore = normalizeScore(score);

  const getScoreBreakdown = (normalizedScore: number): ScoreBreakdown => {
    const total = normalizedScore;
    return {
      keywordMatch: Math.round((total * 0.3)),
      technicalAlignment: Math.round((total * 0.3)),
      seniorityMatch: Math.round((total * 0.2)),
      impactScore: Math.round((total * 0.2))
    };
  };

  const breakdown = getScoreBreakdown(percentageScore);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
        Relevance Score: {Math.round(percentageScore)}%
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Typography variant="body2">
          Keyword Match: {breakdown.keywordMatch}/30
        </Typography>
        <Typography variant="body2">
          Technical Alignment: {breakdown.technicalAlignment}/30
        </Typography>
        <Typography variant="body2">
          Seniority Match: {breakdown.seniorityMatch}/20
        </Typography>
        <Typography variant="body2">
          Impact Demonstration: {breakdown.impactScore}/20
        </Typography>
      </Box>
    </Box>
  );
};

export default ScoreTooltip;
