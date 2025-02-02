import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlayingMovies && (
      <div className="bg-black ">
        <div className="relative z-20 pl-4 mt-0 md:-mt-52 md:pl-12">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
          <MovieList title={"UpComing"} movies={movies.upcomingMovies} />
        </div>
      </div>
    )
  );
};
export default SecondaryContainer;
