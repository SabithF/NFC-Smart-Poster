import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GridBackground } from "./other_components/GridBackground";
import { Spotlight } from "./other_components/spotlight";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-slate-900 to-black text-white px-6">

       < div className="absolute inset-0 -z-10">
                <GridBackground />
                <Spotlight />
              </div>
      <div className="max-w-xl text-center">
        
        <p className="text-8xl font-extrabold tracking-tight text-white/20">404</p>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold">
          Page not found
        </h1>
        <p className="mt-3 text-slate-300">
          Oops — we couldn’t find what you’re looking for. Try another poster to keep collecting badges.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          
          <button
            onClick={() => navigate(-1)}
            className="rounded-full bg-white/10 hover:bg-white/20 px-5 py-2.5 text-white backdrop-blur shadow transition"
          >
            Go back
          </button>
        </div>
      </div>
    </main>
  );
}
