import { Link } from "react-router-dom";
import { getRecentlyReleasedMovies, posterUrl } from "./features/api";
import { useEffect ,useState} from "react";
import "./homepage.css"

export default function HomePage() {
 const [movies, setMovies] = useState([]);
 
  useEffect(() => {
    (async() => {
      try {
        const result = await getRecentlyReleasedMovies({
          daysBack: 60,
          region: "SE",
          language: "sv-SE",
          minVotes:10,
          page:1,
        });
        setMovies(result);

      }catch(e){
         console.error("getRecentlyReleasedMovies error:", e);
      }
    })();
  },[]);
 if (!movies.length)
  return <div style={{ padding: 16 }}>Inga nya filmer hittades.</div>;
  return (
    <div style={{ padding: 16 }}>
      <h1>Populära Filmer...</h1>
      <p>
        Gå till <Link to="/search">Sök</Link> för att hitta filmer.
      </p>
      <section className="newsCard">
        {movies.slice(0, 12).map((m) => (
          <Link key={m.id} to={`/movieDetails/${m.id}`} className="newsCard__item"> 
         <article>
            {m.poster_path ? (
              <img src={posterUrl(m.poster_path)} alt={m.title} loading="lazy" />
            ) : (
              <div className="newsCard__placeholder">Ingen poster</div>
            )}
            <h3 className="newsCard__title">{m.title}</h3>
            <p className="newsCard__meta">
              {/* get the release date/year and month */}
              <time dateTime={m.release_date}>{m.release_date}</time>
              {/* get the result of statistic vote, how great is this movie */}
              {m.vote_average ? <>  ⭐ {m.vote_average.toFixed(1)}</> : null}
            </p>
          </article>

          </Link>
        ))}
      </section>
    </div>
  );
}
