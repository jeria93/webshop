import './account.css';
import { useState } from 'react';
import MoviePoster from '../../components/MoviePoster/MoviePoster';

const Account = () => {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isGuest, setIsGuest] = useState(false);
    const [activeTab,setActiveTab] = useState('profile');
    

    // simulera användardata
    const userData = {
        name: 'John Doe',
        email: 'KZx6S@example.com',
    };

    //simulerad filmdata
    const rentedMovies = [
        { id: 1, title: 'Interstellar', rentDate: "2025-10-09", expires: "2025-10-16", poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
        { id: 2, title: 'Batman', rentDate: "2025-10-09", expires: "2025-10-16", poster_path: "/74xTEgt7R36Fpooo50r9T25onhq.jpg" },
        { id: 3, title: 'Inception', rentDate: "2025-10-09", expires: "2025-10-16", poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg" },
    ];

    const purchasedMovies = [
        { id: 4, title: 'The Shawshank Redemption', purchaseDate: "2025-10-09", poster_path: "/hBcY0fEy9bnZXo33lBfC9PM2QWr.jpg" },
        { id: 5, title: 'The Dark Knight', purchaseDate: "2025-10-09", poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
        { id: 6, title: 'Pulp Fiction', purchaseDate: "2025-10-09", poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg" },
    ];

    const wishlist = [
        { id: 7, title: 'Dune', addedDate: "2025-10-09", poster_path: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg" },
        { id: 8, title: 'Oppenheimer', addedDate: "2025-10-09", poster_path: "/ptpr0kGAckfQkJeJIt8st5dglvd.jpg" },
        { id: 9, title: 'Avatar', addedDate: "2025-10-09", poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg" },
    ];

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleGuest = () => {
        setIsGuest(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsGuest(false);
        setActiveTab('profile');
    };


    //om användaren är inloggad
    if (isLoggedIn) {
        return (
            <div className="account-container">
                <div className="account-header">
                <h1>Välkommen, {userData.name}!</h1>
                </div>

                <div className='account-tabs'>
                    <button className={`tab-button ${activeTab === "profile" ? "active" : ""}`} onClick={() => setActiveTab('profile')}>Profil</button>
                    <button className={`tab-button ${activeTab === "rented" ? "active" : ""}`} onClick={() => setActiveTab('rented')}>Hyrda filmer</button>
                    <button className={`tab-button ${activeTab === "purchased" ? "active" : ""}`} onClick={() => setActiveTab('purchased')}>Köpta filmer</button>
                    <button className={`tab-button ${activeTab === "wishlist" ? "active" : ""}`} onClick={() => setActiveTab('wishlist')}>Önskelista</button>
                </div>

                <div className='account-content'>
                    {activeTab === 'profile' && (
                        <div className='tab-content'>
                            <h2>Din profil</h2>
                            <div className='profile-info'>
                                <div className='info-item'>
                                    <label>Namn:</label>
                                    <span>{userData.name}</span>
                                </div>
                                <div className='info-item'>
                                    <label>E-post:</label>
                                    <span>{userData.email}</span>
                                </div>
                            </div>
                        </div>
                    )}
                
                {activeTab === 'rented' && (
                    <div className='tab-content'>
                        <h2>Dina hyrda filmer</h2>
                        {rentedMovies.length > 0 ? (
                            <div className='movies-grid'>
                                {rentedMovies.map((movie) => (
                                    <div key={movie.id} className='movie-card'>
                                        <h3>{movie.title}</h3>
                                        <MoviePoster path={movie.poster_path} />
                                        <p>Hyrd: {movie.rentDate}</p>
                                        <p className='expires'>Går ut: {movie.expires}</p>
                                        <button className='watch-btn'>Titta nu</button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                        <p>Du har inga hyrda filmer för tillfället.</p>
                        )}
                    </div>
                )}

                
                {activeTab === 'purchased' && (
                    <div className='tab-content'>
                        <h2>Dina köpta filmer</h2>
                        {purchasedMovies.length > 0 ? (
                            <div className='movies-grid'>
                                {purchasedMovies.map((movie) => (
                                    <div key={movie.id} className='movie-card'>
                                        <h3>{movie.title}</h3>
                                        <MoviePoster path={movie.poster_path}/>
                                        <p>Köpt: {movie.purchaseDate}</p>
                                        <button className='watch-btn'>Titta nu</button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                        <p>Du har inga köpta filmer.</p>
                        )}
                    </div>
                )}

                {activeTab === 'wishlist' && (
                    <div className='tab-content'>
                        <h2>Dina sparade filmer</h2>
                        {wishlist.length > 0 ? (
                            <div className='movies-grid'>
                                {wishlist.map((movie) => (
                                    <div key={movie.id} className='movie-card'>
                                        <h3>{movie.title}</h3>
                                        <MoviePoster path={movie.poster_path} />
                                        <button className='rent-btn'>Hyr nu</button>
                                        <button className='purchase-btn'>Köp</button>
                                    </div>
                                ))}

                            </div>

                        ) : (
                            <p>Du har inga sparade filmer.</p>
                        )}
                    </div>
                )}
                </div>

                <div className='account-actions'>
                    <button onClick={handleLogout} className='logout-btn'>
                        Logga ut
                    </button>
                </div>
            </div>
        );
    }
    
    //om anv är gäst
    if (isGuest) {
        return (
            <div className="account-container">
                <div className="account-header">
                <h1>Välkommen som gäst!</h1>
                </div>
                <div className='account-card'>
                    <p>Logga in för att se dina hyrda och köpta filmer, och ha möjlighet att spara filmer i din önskelista</p>
                    <button onClick={handleLogout} className='btn1'>
                    Byt till inloggning
                    </button>
                </div>
            </div>
        );
    }

    //standard login-sida
    return (
        <div className="account-container"style={{ paddingTop: '10px' }}>
            
            <div className="account-header">
            <h1>Logga in</h1>
            <p>Logga in eller fortsätt som gäst</p>
            </div>

            
            <div className="account-card">
                <div className="form-group">
                <label htmlFor="email">E-postadress</label>
                <input type="email" id="email" className='form-control' placeholder="din-e-post@exempel.se" />
                </div>

                <div className="form-group">
                <label htmlFor="password">Lösenord</label>
                <input type="password" id="password" className="form-control" placeholder="Lösenord" />
                </div>

                <button type="button" className="btn1" onClick={handleLogin}>Logga in</button>

                <div className='divider'>
                    <span>eller</span>
                </div>

                <button type="button" className="btn2" onClick={handleGuest}>Fortsätt som gäst</button>
                
                <div className="account-footer">
                <p>Har du inget konto? <a link>Skapa konto</a></p>
                </div>

            

            </div>
            </div>
        
    );
};

export default Account;