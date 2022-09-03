import React from 'react';

export interface ImageProps {
  path: string;
  style: React.CSSProperties;
  width: number;
}

export const MockImage: React.FC<ImageProps> = ({ path, style, width }) => (
  <img src={`http://${window.location.hostname}:8000/${path}`} style={style} alt="" width={width * 4} />
);
