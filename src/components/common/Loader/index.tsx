import React from 'react';
import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';

const Loader = () => {
  return (
    <div className="flex h-auto items-center justify-center bg-transparent dark:bg-transparent flex-col mt-8">
      <DotLottiePlayer
        src="/lotties/books.lottie"
        autoplay
        loop
        style={{ height: '320px', width: '320px' }}
      >
      </DotLottiePlayer>
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">Cargando...</h1>
    </div>
  );
};

export default Loader;
