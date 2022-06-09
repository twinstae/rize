import React from 'react';

export interface ImageProps {
  path: string;
  style: React.CSSProperties;
  width: number;
}

export const MockImage: React.FC<ImageProps> = ({ path, style }) => (
  <span style={style}>{path}</span>
);
