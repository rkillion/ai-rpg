'use client';

export default function LandingSite() {
    function login() {
        window.location.replace("http://localhost:8000/login")
    }

    return (
        <div>
            <h1>Start your world building adventure</h1>
            <button onClick={login}>Login</button>
        </div>
    )
}