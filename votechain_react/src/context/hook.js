import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const HookContext = createContext([])

HookContext.displayName = "HookContext"

export const HookProvider = ({ children }) => {
    const [address, setAddress] = useState(null)

    return <HookContext.Provider value={{}}>{children}</HookContext.Provider>
}
