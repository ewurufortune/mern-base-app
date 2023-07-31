import React from 'react'
import { useSelector, useDispatch } from "react-redux";


export const PlayerStats = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    
  return (
    <div>
        Real Name:{user.firstName}
        Ring Name:{user.lastName}
        Alignment:{user.alignment}
        Popularity:{user.popularity}
        Charisma:{user.charisma}

    </div>
  )
}



export const PlayerPotentialStoryline = () => {
    const user = useSelector((state) => state.user);

  return (
    <div>{user.firstName}</div>
  )
}




export const PlayerActiveStoryline = () => {
    const user = useSelector((state) => state.user);

  return (
    <div>{user.firstName}</div>
  )
}




export const CompanyPushList = () => {
    const user = useSelector((state) => state.user);

  return (
    <div>{user.firstName}</div>
  )
}


export const Actions = () => {
  return (
    <div>PlayerStats</div>
  )
}




