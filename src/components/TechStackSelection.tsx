import React from 'react';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box
} from '@mui/material';

const TechStackSelection = ({ selectedStack, onStackChange }) => {
  return (
    <Box>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="tech-stack-selection"
          name="tech-stack-group"
          value={selectedStack}
          onChange={(e) => onStackChange(e.target.value)}
        >
          <FormControlLabel value="ruby" control={<Radio />} label="Ruby/Rails" />
          <FormControlLabel value="node" control={<Radio />} label="Node.js/TypeScript" />
          <FormControlLabel value="java" control={<Radio />} label="Java/Spring" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default TechStackSelection;
