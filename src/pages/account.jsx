import './account.css';
import { useState } from 'react';

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
        { id: 1, title: 'Interstellar', rentDate: "2025-10-09", expires: "2025-10-16" },
        { id: 2, title: 'Batman', rentDate: "2025-10-09", expires: "2025-10-16" },
        { id: 3, title: 'Interstellar', rentDate: "2025-10-09", expires: "2025-10-16" },
    ];

    const purchasedMovies = [
        { id: 4, title: 'Interstellar', purchaseDate: "2025-10-09" },
        { id: 5, title: 'Batman', purchaseDate: "2025-10-09" },
        { id: 6, title: 'Interstellar', purchaseDate: "2025-10-09" },
    ];

    const watchList = [
        { id: 7, title: 'Interstellar', addedDate: "2025-10-09" },
        { id: 8, title: 'Batman', addedDate: "2025-10-09" },
        { id: 9, title: 'Interstellar', addedDate: "2025-10-09" },
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
                    <button className={'tab-button ${activeTab === "profile" ? "active" : ""}'} onClick={() => setActiveTab('profile')}>Profil</button>
                    <button className={'tab-button ${activeTab === "rented" ? "active" : ""}'} onClick={() => setActiveTab('rented')}>Hyrda filmer</button>
                    <button className={'tab-button ${activeTab === "purchased" ? "active" : ""}'} onClick={() => setActiveTab('purchased')}>Köpta filmer</button>
                    <button className={'tab-button ${activeTab === "wishlist" ? "active" : ""}'} onClick={() => setActiveTab('wishlist')}>Önskelista</button>

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
                                {rentedMovies.map((movie) => (
                                    <div key={movie.id} className='movie-card'>
                                        <h3>{movie.title}</h3>
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



                {activeTab === 'watchlist' && (
                    <div className='tab-content'>
                        <h2>Dina sparade filmer</h2>
                        {watchList.length > 0 ? (
                            <div className='movies-grid'>
                                {rentedMovies.map((movie) => (
                                    <div key={movie.id} className='movie-card'>
                                        <h3>{movie.title}</h3>
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
        <div className="account-container">
            
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