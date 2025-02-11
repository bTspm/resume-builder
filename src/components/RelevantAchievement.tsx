import React from 'react';
import { Stack, Typography } from '@mui/material';
import { GeneratedAchievement } from '../types/project';
import ScoreProgressBar from './ScoreProgressBar';

interface RelevantAchievementProps {
  achievement: GeneratedAchievement;
}

const RelevantAchievement: React.FC<RelevantAchievementProps> = ({ achievement }) => {
  const normalizeScore = (score: number): number => {
    if (score <= 1) {
      return score;
    }
    return score / 100;
  };

  return (
    <Stack direction="column" spacing={1} width="100%">
      <Typography variant="body2">
        {achievement.achievement}
      </Typography>
      <ScoreProgressBar score={normalizeScore(achievement.relevance_score)} />
    </Stack>
  );
};

export default RelevantAchievement;
