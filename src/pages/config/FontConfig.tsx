import { Box, Select } from '@chakra-ui/react';
import React from 'react';

import useFont from '../../config/useFont';
import ConfigHeading from './ConfigHeading';

function FontConfig() {
  const {font, setFont, fontList} = useFont();
  return (
    <Box>
      <ConfigHeading title={'글꼴'}/>
      <Select placeholder="글꼴 선택하기" value={font} onChange={(e) => {
        setFont(e.target.value);
      }}>
        {fontList.map(font => (
          <option key={font} value={font}>{font}</option>
        ))}
      </Select>
    </Box>
  );
}

export default FontConfig;