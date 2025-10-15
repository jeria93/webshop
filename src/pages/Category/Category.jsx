 import "./category.css";
 import { GENRE_IDS, getRecentlyReleasedMovies, posterUrl} from "../../features/api";
 import { useState, useEffect } from "react";
 import { Link } from "react-router-dom";
 

 function MovieCard({movie}) {
    const src = posterUrl(movie.poster_path, "w342");
      return (
        <Link to={`/movieDetails/${movie.id}`}>
    <article className="movie-card">
      {src ? <img src={src} alt={movie.title} loading="lazy" /> : <div className="poster-fallback">Ingen bild</div>}
      <h4>{movie.title}</h4>
      <p>⭐ {movie.vote_average?.toFixed(1)}</p>
    </article>
    </Link>
  );
 }
 
function Category(){

     const initial = ["Komedi", "Skräck", "Action", "Drama", "Romantik"]
    .map(name => ({ name, id: GENRE_IDS[name], items: [], loading: true }));

    const [sections, setSections] = useState(initial)

      useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const results = await Promise.all(
          sections.map(async s => ({
            ...s,
            items: await getRecentlyReleasedMovies( { page: 1, language: "sv-SE", region: "SE", minVotes: 50 },
              { with_genres: String(s.id), sort_by: "popularity.desc" }),
            loading: false,
          }))
        );
        if (alive) setSections(results);
      } catch (e) {
        console.error(e);
        if (alive) setSections(prev => prev.map(s => ({ ...s, loading: false })));
      }
    })();
    return () => { alive = false; };
  }, []);

  return (
    
    <section className="categoryPage">
        <h2 className="pageTitle">Film Kategorier</h2>
     
      {sections.map(sec => (
        <div key={sec.name} className="genreSection">
          <h2 className="genreTitle" >{sec.name}:</h2>
          {sec.loading ? (
            <div className="gridMovie" >
              {Array.from({ length: 8 }).map((_, i) => (
                
                <div key={i}/>
              ))}
            </div>
          ) : sec.items.length ? (
            <div className="gridMovie">
              {sec.items.map(m => <MovieCard key={m.id} movie={m} />)}
            </div>
          ) : (
            <p>Inga titlar hittades.</p>
          )}
        </div>
      ))}
    </section>
  );

    
    
}
export default Category