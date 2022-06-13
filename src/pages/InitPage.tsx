import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { Center, List, ListIcon, ListItem, VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

import RizeLogo from '../components/RizeLogo';
import { useDependencies } from '../hooks/Dependencies';
import { fileList } from '../mailList/fakeMailRepository';
import paths from '../router/paths';
import useNavigation from '../router/useNavigation';


const InitPage = () => {
  const navigation = useNavigation();
  const [isAnimationEnd, setIsAnimationEnd] = useState(false);

  const { fsJSON: { writeJSONfile } } = useDependencies();
  const { status } = useDependencies().useMailList();

  const [uploaded, setUploaded] = useState<{ [fileName: string]: boolean}>({});

  const merged = { ...status, ...uploaded };
  useEffect(() => {
    if (Object.values(status).every((v) => v) && isAnimationEnd) {
      navigation.navigate(paths.MAIL_LIST);
    }
  }, [merged, isAnimationEnd]);

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div>
      <Center width='500' height='100vh'>
        <VStack>
          <RizeLogo onAnimationEnd={() => {setIsAnimationEnd(true);}} />

          <form
            ref={formRef}
            onSubmit={async (e) => {
              e.preventDefault();
              if(! Object.values(merged).every(v => v)) return ;
              const form = formRef.current;
              if(! form) return;
              const files = [...form.elements].flatMap((input) => [...(input as HTMLInputElement).files ?? []]);

              await Promise.all(
                [...files]
                  .filter(file => fileList.includes(file.name))
                  .map(async (file) => writeJSONfile(file.name)(JSON.parse(await file.text())))
              );
              navigation.navigate(paths.MAIL_LIST);
            }}
          >
            <List spacing='3' p="2">
              {fileList.map((name) => {
                const value = merged[name];
                return (
                  <ListItem key={name}>
                    <ListIcon
                      as={value ? CheckCircleIcon : WarningIcon}
                      color={value ? 'green.500' : 'red.500'}
                    />
                    <label>
                      {name}
                      <input type="file" accept="application/json"
                        onChange={() => {
                          const form = formRef.current;
                          if(! form) return;
                          const files = [...form.elements].flatMap((input) => [...(input as HTMLInputElement).files ?? []]);
                          setUploaded(Object.fromEntries(files.map(file => [file.name, true])));
                        }}/>
                    </label>
                  </ListItem>
                );
              })}
            </List>
            <Button type="submit" p="2">upload</Button>
          </form>
        </VStack>
      </Center>
    </div>
  );
};

export default InitPage;
