import { useState, createContext, useReducer, useEffect } from "react"
import { authReducer } from "../reducers/authReducer"
import axios from 'axios'
export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: true,
        user: null,
        profileLoading: true,
        profile: null,
        profiles: []
    })

    const authContextData = {
        authState,

    }


    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider;
