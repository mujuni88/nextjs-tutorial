import { title } from "process";
import Image from 'next/image';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Movie Details',
  description: 'Movie Details',
}

export default async function MovieDetails({params}: {params: {movie: string}}){
  const url = `https://api.themoviedb.org/3/movie/${params.movie}?api_key=${process.env.API_KEY}&language=en-US`;

  const response =  await(await fetch(url)).json();
  const {original_title, overview, poster_path, release_date, runtime} = response;

  return (
    <div className="flex flex-col gap-3 p-14">
      <h1 className="text-2xl">{original_title}</h1>
      <p>{overview}</p>
      <p className="mb-3">{release_date}</p>
      <p className="mb-3">{runtime} minutes</p>
      <Image src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} className="rounded-sm" width={250} height={ 500 }/>
    </div>
  );
}