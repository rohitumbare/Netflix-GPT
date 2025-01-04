import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
import lang from "../utils/languageConstants";
import openai from "../utils/openai";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          movie
        )}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error("Error fetching movie from TMDB:", error);
      return [];
    }
  };

  const handleGptSearchClick = async () => {
    const query = searchText.current?.value?.trim();
    if (!query) {
      alert(lang[langKey].gptSearchEmptyError); 
      return;
    }

    const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query: "${query}". Provide only 5 movie names, comma-separated.`;

    try {
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
      if (!gptMovies) {
        alert(lang[langKey].gptSearchError); 
        return;
      }

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.allSettled(promiseArray);

      const successfulResults = tmdbResults
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

      dispatch(
        addGptMovieResult({
          movieNames: gptMovies,
          movieResults: successfulResults,
        })
      );
    } catch (error) {
      console.error("Error during GPT request:", error);
      alert(lang[langKey].gptApiError); 
    }
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="grid w-full grid-cols-12 bg-black rounded-xl md:w-1/2"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="col-span-9 p-4 m-4 border-[#D9232E]"
          placeholder={lang[langKey]?.gptSearchPlaceholder || "Search..."}
        />
        <button
          className="col-span-3 px-4 py-2 m-4 text-white bg-red-700 rounded-lg hover:text-black"
          onClick={handleGptSearchClick}
        >
          {lang[langKey]?.search || "Search"}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
