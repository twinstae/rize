import { ArrowBackIcon } from '@chakra-ui/icons';
import { IconButton, StackDivider, Tooltip, VStack, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';
import { useDependencies } from '../hooks/Dependencies';
import paths from '../router/paths';
import FontConfig from './config/FontConfig';
import NickNameConfig from './config/NickNameConfig';
import ProfileConfig from './config/ProfileConfig';

const Wrapper = styled.header`
  padding: 0.5rem;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  background-color: var(${props => props.theme ? '--chakra-colors-gray-800' : '--chakra-colors-white'});
  z-index: 999;
`;

const Config = () => {
  const { navigation, isDark } = useDependencies();
  return (
    <div>
      <Wrapper theme={isDark}>
        <Tooltip label="돌아가기">
          <IconButton
            variant="ghost"
            icon={<ArrowBackIcon />}
            onClick={() => navigation.navigate(paths.MAIL_LIST)}
            aria-label="돌아가기"
          />
        </Tooltip>
        <Text fontSize="2xl" fontWeight="bold" paddingLeft="2">설정</Text>
      </Wrapper>
      <VStack
        overflowY="scroll"
        overscrollY="auto"
        divider={<StackDivider borderColor='gray.100' />}
        p="4"
        spacing={4}
        align='stretch'
      >
        <FontConfig />
        <NickNameConfig />
        <ProfileConfig />
      </VStack>
    </div>
  );
};

export default Config;
