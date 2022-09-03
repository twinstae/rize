import React from 'react';

interface TooltipProps {
  tip: string;
  className?: string;
  children: React.ReactNode;
}

export function Tooltip(props: TooltipProps) {
  return (
    <span
      className={
        'tooltip z-10 ' + props.className ?? ''
      }
      data-tip={props.tip}
    >
      {props.children}
    </span>
  );
}
