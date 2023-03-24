import Movie from "./Movie";

export default async function Home() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`;

  const data = await (await fetch(url)).json();
  console.log(data)
  return (
    <main className='p-2'>
      <h1 className="text-lg text-lime-300">Popular Movies</h1>
      <section className="grid grid-cols-3 gap-3">

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

