import React from 'react';
import { EmbedComponentProps, Platform } from '../types';

const DIRECT_IMAGE_REGEX = /^https?:\/\/.+\.(jpe?g|webp|png|svg)$/;

function isPlatform(str: string) {
  return DIRECT_IMAGE_REGEX.test(str);
}

function EmbedComponent({ src, ...props }: EmbedComponentProps) {
  return <img src={src} {...props} />;
}

const DirectImage: Platform = {
  id: 'direct-image',
  isPlatform,
  EmbedComponent,
};

export default DirectImage;
