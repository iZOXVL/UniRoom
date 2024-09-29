"use client";
import React from 'react';
import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Metadata } from "next";


export default function Home() {
  return (
      <div className="flex h-auto items-center justify-center bg-transparent dark:bg-transparent mt-16 flex-col">
        <DotLottiePlayer
          src="/lotties/home.json"
          autoplay
          loop
          style={{ height: '320px', width: '320px' }}
        >
        </DotLottiePlayer>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-slate-200 mt-4">
          📚 Bienvenido al dashboard de administración de NextBook 📚
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
          Explora y administra tus contenidos fácilmente 🚀
        </p>
      </div>
  );
}
