import { Metadata } from "next";
import Movie from "./Movie";

export const metadata: Metadata = {
  title: "Popular Movies",
  description: "A list of popular movies"
}

export async function generateStaticParams(){
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`;

  const movies = await (await fetch(url)).json();

  return movies.results.map((movie: any) =>  movie.id.toString());
}

export default async function Home() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`;

  const data = await (await fetch(url)).json();
  return (
    <main className='p-2'>
      <h1 className="text-lg text-lime-300">Popular Movies</h1>
      <section className="grid gap-10 grid-cols-fluid">

      {data.results.map((movie: any) => {
        return (
          <Movie key={movie.id} {...movie} />
        )
      })
      }
      </section>
    </main>
  )
}

