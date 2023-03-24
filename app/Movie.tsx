import Image from 'next/image';

export default function Movie ({ title, overview, poster_path, releaseDate }: any){
  return (
    <div>
      <h2 className="mb-2">{title}</h2>
      <p>{overview}</p>
      <Image src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} className="rounded-sm" width={200} height={ 400 }/>
    </div>
  );
};
