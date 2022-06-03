import { Heading } from '@chakra-ui/react';
import React from 'react';

function ConfigHeading({title}: {title: string}) {
  
  return (
    <Heading id={title+'-config'} fontSize='lg' as="h3" fontFamily="inherit" marginBottom="2">{title}</Heading>
  );
}

export default ConfigHeading;