import React from 'react';

interface Props {
  path: string;
  style: React.CSSProperties;
  width: number;
}

export const MockImage: React.FC<Props> = ({ path, style }) => (
  <span style={style}>{path}</span>
);
