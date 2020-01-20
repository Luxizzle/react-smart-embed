import React from 'react';
import pLocate, { Options as PLocateOptions } from 'p-locate';
import { EmbedProps, PlatformList, Platform } from './types';
// TODO: remove this
// @ts-ignore
import usePromise from 'react-promise-suspense';

export { default as Gfycat } from './platforms/Gfycat';
export { default as ImgurImage } from './platforms/ImgurImage';
export { default as ImgurGif } from './platforms/ImgurGif';
export { default as RedditImage } from './platforms/RedditImage';
export { default as DirectImage } from './platforms/DirectImage';

export * from './types';

const getSupportedPlatform = (
  src: string,
  platforms: PlatformList,
  { preserveOrder, concurrency }: PLocateOptions
) =>
  pLocate(platforms, ({ isPlatform }) => isPlatform(src), {
    preserveOrder,
    concurrency,
  });

export const Embed = ({
  platforms,
  src,
  preserveOrder = false,
  concurrency = 4,
  ...props
}: EmbedProps) => {
  const platform: Platform | undefined = usePromise(getSupportedPlatform, [
    src,
    platforms,
    { preserveOrder, concurrency },
  ]);

  if (platform) {
    return <platform.EmbedComponent src={src} {...props} />;
  } else {
    return null;
  }
};
