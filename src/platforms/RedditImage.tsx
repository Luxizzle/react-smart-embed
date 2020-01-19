import React from 'react';
import { EmbedComponentProps, Platform } from '../types';

const REDDIT_IMAGE_REGEX = /^http?s:\/\/i\.redd\.it\/\w+\.\w+/;

async function isPlatform(src: string) {
  return REDDIT_IMAGE_REGEX.test(src);
}

function EmbedComponent({ src, ...props }: EmbedComponentProps) {
  return <img src={src} {...props} />;
}

const RedditImage: Platform = {
  id: 'reddit-image',
  isPlatform,
  EmbedComponent,
};

export default RedditImage;
