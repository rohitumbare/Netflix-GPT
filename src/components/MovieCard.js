import { IMG_CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const MovieCard = ({ posterPath ,id}) => {
  if (!posterPath) return null;
  // console.log(id)
  return (
    <div className="pr-4 w-36 md:w-48 ">
      <Link to={`/moviedetails/${id}`}>

        {" "}
        <img
          alt="Movie Card"
          src={IMG_CDN_URL + posterPath}
          className="cursor-pointer hover:scale-105"
        />
      </Link>
    </div>
  );
};
export default MovieCard;
