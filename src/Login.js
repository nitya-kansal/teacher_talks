import React, { useState } from 'react';
import './Login.css';

const Login = ({successHandler}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const userMap = new Map();

    // user IDs and passwords
    userMap.set('naman', '12345');
    userMap.set('nitya', '12345');
    userMap.set('dhruv', '12345');
    userMap.set('sarthak', '12345');
    userMap.set('rishi', '12345');


    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Username:', username);
        console.log('Password:', password);

        if(userMap.has(username) && userMap.get(username) === password){
            setError('');
            successHandler()
        }
        else{
            setError('Invalid username or password');
        }
    };



    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label htmlFor="username" className='alignLeft'>Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button" >Login</button>
            </form>
        </div>
    );
};

export default Login;