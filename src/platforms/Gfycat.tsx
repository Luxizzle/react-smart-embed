import React, { useMemo } from 'react';
import useSWR from 'swr';
import { Platform, EmbedComponentProps } from '../types';

const GFYCAT_REGEX = /^https?:\/\/gfycat\.com\/(\w+)$/i;
const API_URL = 'https://api.gfycat.com/v1/gfycats';

export const fetcher = (url: string) =>
  fetch(url, { cache: 'force-cache' }).then(res => res.json());

function isPlatform(str: string) {
  return GFYCAT_REGEX.test(str);
}

function EmbedComponent({ src, ...props }: EmbedComponentProps) {
  const id = useMemo(() => (GFYCAT_REGEX.exec(src) as RegExpExecArray)[1], [
    src,
  ]);
  const { data, error } = useSWR(`${API_URL}/${id}`, fetcher, {
    suspense: true,
  });
  if (error) throw error;

  const url = data?.gfyItem?.webmUrl;

  if (url) {
    return <video src={url} {...props} />;
  } else {
    return null;
  }
}

const Gfycat: Platform = {
  id: 'gfycat',
  isPlatform,
  EmbedComponent,
};

export default Gfycat;
