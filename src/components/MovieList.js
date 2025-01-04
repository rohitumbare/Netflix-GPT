import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  // console.log(movies);
  return (
    <div className="px-6 ">
      <h1 className="py-4 text-lg text-white md:text-3xl ">{title}</h1>
      <div className="flex overflow-y-hidden overflow-x-scroll scrollbar-thin scrollbar-thumb-[#D9232E] scrollbar-track-black">
        <div className="flex ">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} id={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default MovieList;
