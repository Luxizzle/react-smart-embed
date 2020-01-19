# React Smart Embed

Suspense ready embed component.

"Smart" as in it supports multiple platforms and is able to resolve the type of platform on its own.

## Usage

```js
import React, { Suspense } from 'react';
import {
  Embed,
  DirectImage,
  ImgurGif,
  ImgurImage,
  Gfycat,
} from 'react-smart-embed';

function Component() {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <Embed
          platforms={[ImgurGif, ImgurImage, DirectImage, Gfycat]}
          src="https://gfycat.com/speedyyellowkestrel"
        />
      </Suspense>
    </div>
  );
}
```

The example above should render a `video` element with the an mp4 source of the given gfycat source.

Platforms are objects with an `isPlatform` function and an `EmbedComponent` function.

- `Platform.isPlatform`

  Should return a boolean or a promise that resolves to a boolean. If true, indicates that this platform supports the given url.

- `Platform.EmbedComponent`

  A component that should render the given url as an image, video, youtube embed, etc..

This module already has a few supported platforms:

- `DirectImage` Supports any url ending with an image extension.
- `Gfycat` Gfycat gifs as mp4 videos.
- `ImgurGif` Imgur gifs as mp4 videos.
- `ImgurImage` Imgure images.
- `RedditImage` Images from `i.redd.it` if you want finer control over supported platforms and dont want to use `DirectImage`

Do you have ideas for more supported platforms? Make an issue and/or pull request!

## Roadmap

- [ ] Add tests
- [ ] Add more platforms
  - [ ] `RedditVideo` support `v.redd.it`
  - [ ] `Youtube` support youtube embeds
  - [ ] `YoutubeLite` support [`lite-youtube`](https://github.com/paulirish/lite-youtube-embed)?
- [ ] Better example
- [ ] Better documentation
