'use client'

import { useEffect, useState } from "react"

export default function Game() {
    const [worldList, setWorldList] = useState([]);

    useEffect(()=>{
        fetch('/api/worlds')
        .then(r=>{
            if (r.ok) {
                return r.json();
            } else {
                throw new Error('Problem getting worlds');
            }
        })
        .catch(console.log)
        .then(d=>setWorldList(d.worlds))
    }, [])

    function handleNewGame() {
        fetch('/api/worlds',{
            method: 'POST'
        })
        .then(r=>{
            if (r.ok) {
                return r.json();
            } else {
                throw new Error('Problem creating world');
            }
        })
        .catch(console.log)
        .then(console.log)
    }

    return (
        <div>
            <h1>Your Games</h1>
            {worldList.length>0 ? worldList.map(w=><p key={w.id}>{w.name||`Untitled ${w.updatedAt}`}</p>) : "None"}
            <div>
                <button onClick={handleNewGame}>New Game</button>
            </div>
        </div>
    )
}