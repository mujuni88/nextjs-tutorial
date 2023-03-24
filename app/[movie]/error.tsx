"use client";

import { useEffect } from "react";

export default function Error({error, reset}: {error: Error, reset: () => void}) {
  useEffect(() => {
    console.error(error)
  }, [error]);

  return (
    <div className="text-3xl font-bold underline">
      <p>Error: Movie could not be found</p>
      <button onClick={() => reset()}>Try Again</button>

    </div>
  );
}