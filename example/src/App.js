import React, { Suspense } from 'react';
import {
  Embed,
  DirectImage,
  ImgurGif,
  ImgurImage,
  Gfycat,
} from 'react-smart-embed';

function App() {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <Embed
          platforms={[ImgurGif, ImgurImage, DirectImage, Gfycat]}
          src="https://cdnb.artstation.com/p/assets/images/images/023/347/795/large/elias-stern-guillaume-cayron-sketch-flattened-kopie.jpg"
        />
        <Embed
          platforms={[ImgurGif, ImgurImage, DirectImage, Gfycat]}
          src="https://i.redd.it/dr20v8jihp431.jpg"
        />
        <Embed
          platforms={[ImgurGif, ImgurImage, DirectImage, Gfycat]}
          src="https://imgur.com/c6cWrDb"
          controls
        />
        <Embed
          platforms={[ImgurGif, ImgurImage, DirectImage, Gfycat]}
          src="https://gfycat.com/speedyyellowkestrel"
          controls
        />
      </Suspense>
    </div>
  );
}

export default App;
