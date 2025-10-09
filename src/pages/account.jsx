import './account.css';

const Account = () => {
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

                <button type="submit" className="btn1">Logga in</button>

                <div className='divider'>
                    <span>eller</span>
                </div>

                <button type="submit" className="btn2">Fortsätt som gäst</button>
                
                <div className="account-footer">
                <p>Har du inget konto? <a link>Skapa konto</a></p>
                </div>

            

            </div>
            </div>
        
    );
};

export default Account;