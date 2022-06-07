
import { HStack, StackDivider, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';

import BackButton from '../components/BackButton';
import DarkModeButton from '../components/DarkModeButton';
import useDarkMode from '../theme/useDarkMode';
import LangConfig from './config/LangConfig';
import NickNameConfig from './config/NickNameConfig';
import ProfileConfig from './config/ProfileConfig';
import TestingButton from './config/TestingButton';

const Wrapper = styled.header`
  padding: 0.5rem;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  background-color: var(${props => props.theme ? '--chakra-colors-gray-800' : '--chakra-colors-white'});
  z-index: 999;
  border-bottom: 1px solid lightgray;
`;

const Config = () => {
  const { isDark } = useDarkMode();
  return (
    <div>
      <Wrapper theme={isDark}>
        <HStack>
          <BackButton />
          <DarkModeButton />
        </HStack>
      </Wrapper>
      <VStack
        overflowY="scroll"
        overscrollY="auto"
        divider={<StackDivider borderColor='gray.100' />}
        p="4"
        spacing={4}
        align='stretch'
      >
        <NickNameConfig />
        <ProfileConfig />
        <LangConfig />
        <TestingButton />
      </VStack>
    </div>
  );
};

export default Config;
