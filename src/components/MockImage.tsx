import React from 'react';

export interface ImageProps {
  path: string;
  style: React.CSSProperties;
  width: number;
}

export const MockImage: React.FC<ImageProps> = ({ path, style, width }) => (
  <img src={'http://localhost:8000/'+path} style={style} alt={path} width={width * 4} />
);
