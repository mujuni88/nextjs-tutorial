import Image from 'next/image';
import Link from 'next/link';

export default function Movie ({ id, title, poster_path }: any){
  return (
    <div className='p-1'>
      <h2 className="mb-2">{title}</h2>
      <Link href={`/${id}`}>
      <Image src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} className="rounded-sm" width={200} height={ 400 }/>
      </Link>
    </div>
  );
};
