import React from "react";

const MovieCard = ({movie:
    { title, vote_avarage, poster_path, release_date, original_language}
}) =>{
    return(
        <>
        <div className="movie-card">
            <p className="text-white">{title}</p>
            <img
                src={poster_path ? `https://image.tmd.org/t/p/w500/${poster_path}`:'/no-movie.png'}
                alt={title}
                />
        </div>

        <div className="mt-4">
        <h3>{title}</h3>
        </div>

        <div>
            <div className="content">
                <div className="rating"></div>
                <img src ="star.svg"alt ="Star Icon"/>
                <p>{vote_avarage ? vote_avarage.toFixed(1): 'N/A'}</p>
            </div>

            <span> .</span>
            <p className="lang">{original_language}</p>

            <span>.</span>
            <p className="year">
                {release_date ? release_date.split('-')[0] : 'N/A'}
            </p>
        </div>
        </>
    )
}

export default MovieCard