import React from "react"
import CursorFollower from "../ui/cursorfollower"

export default function Layout({ children }:{ children:React.ReactNode }) {
  return(
    <>
      <CursorFollower cursorRadius={20}/>
      {children}
    </>
  )
}