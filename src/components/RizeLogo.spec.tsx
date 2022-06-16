import { ChakraProvider } from '@chakra-ui/provider';
import theme from '@chakra-ui/theme';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import RizeLogo from './RizeLogo';

test.use({ viewport: { width: 449, height: 300 } });
test('애니메이션이 끝나면 아이즈원 로고가 찍힌다.', async ({
  mount,
  browserName,
}) => {
  let isEnd = false;
  const component = await mount(
    <ChakraProvider theme={theme}>
      <RizeLogo
        onAnimationEnd={() => {
          isEnd = true;
        }}
      />
    </ChakraProvider>
  );
  expect(isEnd).toBe(false);

  expect(await component.first().screenshot()).toMatchSnapshot(`rize-logo:start:${browserName}.png`);

  await expect.poll(() => isEnd).toBe(true);

  expect(await component.first().screenshot()).toMatchSnapshot(`rize-logo:end:${browserName}.png`);
});
