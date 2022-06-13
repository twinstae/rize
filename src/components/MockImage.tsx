import React from 'react';

export interface ImageProps {
  path: string;
  style: React.CSSProperties;
  width: number;
}

export const MockImage: React.FC<ImageProps> = ({ path, style }) => (
  <img style={style} alt={path} />
);
