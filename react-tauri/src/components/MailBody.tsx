import React from 'react';

import useUsername from '../config/useUsername';
import { useDependencies } from '../hooks/Dependencies';

interface Props {
  mailBody: {
    body: string;
    images: string[];
  };
}

function MailBody({ mailBody }: Props) {
  const { Image } = useDependencies();
  const usernameService = useUsername();
  const body = usernameService.replaceUsername(mailBody.body);
  const parts = body.split('{이미지}');
  function getPath(index: number) {
    return mailBody ? mailBody.images[index] : 'img/404.jpeg';
  }

  return (
    <>
      {parts.map((part, i) => (
        <div key={part + i}>
          <div
            style={{
              lineHeight: '1.6rem',
              padding: '1rem',
            }}
            dangerouslySetInnerHTML={{
              __html: part,
            }}
          ></div>
          {i < parts.length - 1 && (
            <Image
              path={getPath(i)}
              style={{ width: '100%', borderRadius: '0.5rem' }}
            />
          )}
        </div>
      ))}
    </>
  );
}

export default MailBody;
