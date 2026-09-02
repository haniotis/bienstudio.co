"use client"

import React, { createContext, useContext } from "react"

type ButtonSize = "default" | "sm"

interface IconContextType {
  buttonSize?: ButtonSize
}

const IconContext = createContext<IconContextType>({})

export const IconProvider: React.FC<{
  children: React.ReactNode
  buttonSize?: ButtonSize
}> = ({ children, buttonSize }) => {
  return (
    <IconContext.Provider value={{ buttonSize }}>
      {children}
    </IconContext.Provider>
  )
}

export const useIconContext = () => {
  const context = useContext(IconContext)
  return context
}
