import React, { useEffect, useState } from 'react';
import { API_OPTIONS, BG_URL, IMG_CDN_URL, LOGO } from "../utils/constants";
import { Link, useParams } from 'react-router-dom';

const MovieDetails = ({ id }) => {
    const [moviedetail, setMoviedetail] = useState(null);
    const { movieId } = useParams();

    useEffect(() => {
        fetchMovieDetails();
    }, []);

    const fetchMovieDetails = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, API_OPTIONS);
        const json = await data.json();
        setMoviedetail(json);
    };

    const formatRuntime = (minutes) => {
        if (!minutes) return "N/A";
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const formatCurrency = (amount) => {
        if (!amount || amount === 0) return "N/A";
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const formatVoteAverage = (vote) => {
        if (!vote) return "N/A";
        return vote.toFixed(1); // Keep one decimal place
    };

    return (
        <>
            <div>
                <div className="fixed -z-10 brightness-50 blur-sm ">
                    <img className="object-cover w-screen h-screen" src={BG_URL} alt="background" />
                </div>
                <Link to={"http://localhost:3000/browse"}>
                    <img className="mx-auto w-44 md:mx-7" src={LOGO} alt="logo" />
                </Link>

                <div className="flex flex-col items-center ">
                    <div className="flex mt-9 md:mt-40">
                        <img
                            alt="Movie Card"
                            src={IMG_CDN_URL + moviedetail?.backdrop_path}
                            className="md:size-fit size-9/12 drop-shadow-2xl"
                        />
                    </div>

                    <div className="w-[91%] mt-4 text-white md:w-1/3 md:text-lg">
                        <h1><strong><span className="text-red-500">Title </span>: </strong>{moviedetail?.title}</h1>
                        <h1><strong><span className="text-red-500">Tagline </span>: </strong>{moviedetail?.tagline}</h1>
                        <h1><strong><span className="text-red-500">Overview </span>: </strong>{moviedetail?.overview}</h1>
                        <h1>
                            <strong><span className="text-red-500">Runtime </span>: </strong>
                            {formatRuntime(moviedetail?.runtime)}
                        </h1>
                        <h1>
                            <strong><span className="text-red-500">Vote Average </span>: </strong>
                            {formatVoteAverage(moviedetail?.vote_average)}
                        </h1>
                        <h1>
                            <strong><span className="text-red-500">Budget </span>: </strong>
                            {formatCurrency(moviedetail?.budget)}
                        </h1>
                        <h1>
                            <strong><span className="text-red-500">Revenue </span>: </strong>
                            {formatCurrency(moviedetail?.revenue)}
                        </h1>
                        <h1>
                            <strong><span className="text-red-500">Release Date </span>: </strong>{moviedetail?.release_date}
                        </h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieDetails;
