import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    user: {},
    isAuthenticated: false
}

const FAKE_USER = {
    name: "Arvin",
    email: "arvin99@example.com",
    password: "Welcome1",
    avatar: "/avatar.jpg",
};

function reducer(state, action) {
    switch(action.type) {
        case 'login':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        case 'logout':
            return {
                ...state,
                user: null,
                isAuthenticated: false
            }
        default: throw new Error('Unknown action');
    }
}

function AuthProvider({children}) {
    const [{ user, isAuthenticated}, dispatch] = useReducer(reducer, initialState);

    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({type: 'login', payload: FAKE_USER});
        }
    }

    function logout() {
        dispatch({type: 'logout'});
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) return new Error("Auth Context was used outside the AuthProvider");
    return context;
}

export { AuthProvider, useAuth }
