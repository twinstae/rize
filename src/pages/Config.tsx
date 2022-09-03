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
  background-color: var(
    ${(props) => (props.theme ? 'bg-gray-800' : 'bg-white')}
  );
  z-index: 999;
  border-bottom: 1px solid lightgray;
`;

const Config = () => {
  const { isDark } = useDarkMode();
  return (
    <div>
      <Wrapper theme={isDark}>
        <div>
          <BackButton />
          <DarkModeButton />
        </div>
      </Wrapper>
      <div
        className="flex flex-col"
      >
        <NickNameConfig />
        <ProfileConfig />
        <LangConfig />
        <TestingButton />
      </div>
    </div>
  );
};

export default Config;
