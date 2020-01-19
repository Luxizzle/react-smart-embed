import React, { useMemo } from 'react';
import { EmbedComponentProps, Platform } from '../types';
import { ImgurType, getImgurType, IMGUR_REGEX } from '../util/imgur';

function isPlatform(src: string) {
  return getImgurType(src).then(t => t === ImgurType.Gif);
}

function EmbedComponent({ src, ...props }: EmbedComponentProps) {
  const hash = useMemo(() => (IMGUR_REGEX.exec(src) as RegExpExecArray)[1], [
    src,
  ]);

  return <video src={`https://i.imgur.com/${hash}.mp4`} {...props} />;
}

const ImgurGif: Platform = {
  id: 'imgur-gif',
  isPlatform,
  EmbedComponent,
};

export default ImgurGif;
