import fetch from 'isomorphic-fetch';

const IMGUR_CLIENT_ID = 'dccaa9d072e72f2'; // Authorization: Client-ID

export const IMGUR_REGEX = /^https?:\/\/(?:i\.)?imgur\.com\/(\w+)(\.\w+)?$/i;

export enum ImgurType {
  None,
  Image,
  Gif,
  Album,
}

const IMGUR_TYPE_CACHE: Map<string, ImgurType> = new Map();
export async function getImgurType(src: string): Promise<ImgurType> {
  if (IMGUR_TYPE_CACHE.has(src)) return IMGUR_TYPE_CACHE.get(src) as ImgurType;

  if (IMGUR_REGEX.test(src) === false) {
    IMGUR_TYPE_CACHE.set(src, ImgurType.None);
    return ImgurType.None;
  }

  const [, hash, extension] = IMGUR_REGEX.exec(src) as RegExpExecArray;

  if (extension) {
    if (extension.endsWith('.jpg')) {
      IMGUR_TYPE_CACHE.set(src, ImgurType.Image);
      return ImgurType.Image;
    } else if (
      extension.endsWith('.gif') ||
      extension.endsWith('.gifv') ||
      extension.endsWith('.mp4')
    ) {
      IMGUR_TYPE_CACHE.set(src, ImgurType.Gif);
      return ImgurType.Gif;
    }
  }

  return getImageLink(hash).then(link => getImgurType(link));
}

const IMGUR_API_CACHE: Map<string, string> = new Map();

export async function getImageLink(hash: string): Promise<string> {
  if (IMGUR_API_CACHE.has(hash)) return IMGUR_API_CACHE.get(hash) as string;

  return fetch(`https://api.imgur.com/3/image/${hash}`, {
    cache: 'force-cache',
    headers: { Authorization: `Client-ID ${IMGUR_CLIENT_ID}` },
  })
    .then(res => res.json())
    .then(({ data }) => {
      IMGUR_API_CACHE.set(hash, data.link);

      return data.link;
    });
}
