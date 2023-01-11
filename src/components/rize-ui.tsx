import React from 'react';

function FormLabel({ className, children, ...props }: React.ComponentProps<'label'>) {
  return <label {...props} className={className + ' label'}>{children}</label>;
}

function Input({ className, ...props }: React.ComponentProps<'input'>) {
  return <input {...props} className={className + ' input'}/>;
}

function Radio({ className, ...props }: React.ComponentProps<'input'>) {
  return <input {...props} type="radio" className={className + ' radio'} />;
}

function VStack({ className, children, ...props }: React.ComponentProps<'div'>) {
  return <div {...props} className={className + ' flex flex-col gap-4'}>{children}</div>;
}

function HStack({ className, children, ...props }: React.ComponentProps<'div'>) {
  return <div {...props} className={className + ' flex flex-row gap-4'}>{children}</div>;
}


export { FormLabel, Input, Radio, VStack, HStack };
