import React, { useMemo } from 'react';
import { EmbedComponentProps, Platform } from '../types';
import { IMGUR_REGEX, ImgurType, getImgurType } from '../util/imgur';

function isPlatform(src: string) {
  return getImgurType(src).then(t => t === ImgurType.Image);
}

function EmbedComponent({ src, ...props }: EmbedComponentProps) {
  const hash = useMemo(() => (IMGUR_REGEX.exec(src) as RegExpExecArray)[1], [
    src,
  ]);

  return <img src={`https://i.imgur.com/${hash}.jpg`} {...props} />;
}

const ImgurImage: Platform = {
  id: 'imgur-image',
  isPlatform,
  EmbedComponent,
};

export default ImgurImage;
