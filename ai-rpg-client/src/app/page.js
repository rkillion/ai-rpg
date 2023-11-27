"use client"

import { useEffect } from "react";
import LandingSite from "../LandingSite";
import Game from "@/Game";
import { UserProvider, useUser, useUserDispatch } from "@/context/UserContext";

export default function Home() {

  return (
    <UserProvider>
      <AuthRouter />
    </UserProvider>
  )
}

function AuthRouter() {
  const userDispatch = useUserDispatch();

  useEffect(()=>{
    userDispatch({action: "beginLoad"})
    fetch("/api/me")
    .then(r=>{
      if (r.ok) {
        return r.json();
      } else {
        throw new Error('Not Logged in')
      }
    })
    .then(u=>{
      userDispatch({action: "setAndEndLoad", user: u})
    })
    .catch(e=>{
      userDispatch({action: "endLoad"})
    })
  }, [])

  return <View />
}

function View() {
  const { user, isLoadingUser} = useUser();

  if (isLoadingUser) return "Loading!";

  return (
    <div>
      {user.email ? <Game /> : <LandingSite />}
    </div>
  )
}