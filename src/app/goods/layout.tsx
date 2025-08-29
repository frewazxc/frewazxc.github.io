import React from "react"
import CursorFollower from "../../components/custom/cursorfollower"

export default function Layout({ children }:{ children:React.ReactNode }) {
  return(
    <>
      <CursorFollower/>
      {children}
    </>
  )
}