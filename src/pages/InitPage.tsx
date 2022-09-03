import { Center, VStack } from '@chakra-ui/layout';
import React, { useEffect, useRef, useState } from 'react';

import { useDependencies } from '../hooks/Dependencies';
import { fileList } from '../mailList/fakeMailRepository';
import paths from '../router/paths';
import useNavigation from '../router/useNavigation';

const InitPage = () => {
  const navigation = useNavigation();
  const [isAnimationEnd, setIsAnimationEnd] = useState(false);

  const { fsJSON, useMailList, RizeLogo } = useDependencies();
  const { status } = useMailList();

  const [uploaded, setUploaded] = useState<{
    [fileName: string]: boolean | undefined;
  }>({});

  const merged = { ...status, ...uploaded };
  const isAlreadLoaded = Object.values(status).every((v) => v === true);
  useEffect(() => {
    if (isAlreadLoaded && isAnimationEnd) {
      navigation.redirect(paths.MAIL_LIST);
    }
  }, [isAlreadLoaded, isAnimationEnd]);

  const formRef = useRef<HTMLFormElement>(null);

  function getFiles() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const form = formRef.current!;
    const files = [...form.elements].flatMap((input) => [
      ...((input as HTMLInputElement).files ?? []),
    ]);
    return Array.from(files);
  }

  const everyOk = !Object.values(merged).some((v) => v === false);
  return (
    <div>
      <Center width="500" height="100vh">
        <VStack>
          <RizeLogo
            onAnimationEnd={() => {
              setIsAnimationEnd(true);
            }}
          />

          {Object.values(status).every((v) => v !== undefined) && (
            <form
              ref={formRef}
              className="flex flex-col p-8"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!everyOk) return;

                await Promise.all(
                  getFiles()
                    .filter((file) => fileList.includes(file.name))
                    .map(async (file) =>
                      fsJSON.writeJSONfile(file.name)(
                        JSON.parse(await file.text())
                      )
                    )
                );
                navigation.redirect(paths.MAIL_LIST);
              }}
            >
              <ul>
                {fileList.map((name) => {
                  const value = merged[name];
                  return (
                    <li key={name} className="mb-1 p-1">
                      <input
                        type="checkbox"
                        checked={value}
                        className="checkbox checkbox-secondary checkbox-xs"
                        onChange={() => undefined}
                      />
                      <label>
                        {name}
                        <input
                          type="file"
                          accept="application/json"
                          disabled={value}
                          onChange={() => {
                            setUploaded(
                              Object.fromEntries(
                                getFiles().map((file) => [file.name, true])
                              )
                            );
                          }}
                        />
                      </label>
                    </li>
                  );
                })}
              </ul>
              <button className="btn btn-secondary btn-sm p-2" type="submit" disabled={isAlreadLoaded}>
                upload
              </button>
            </form>
          )}
        </VStack>
      </Center>
    </div>
  );
};

export default InitPage;
