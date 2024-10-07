import { createContext, useState, useEffect } from 'react';

const BASE_URL = 'http://localhost:9000';
const CitiesContext = createContext();

function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(function () {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const response = await fetch(`${BASE_URL}/cities`);
                const data = await response.json();
                console.log(data);
                setCities(data);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, []);

    return (
        <CitiesContext.Provider value={{cities, isLoading}}>
            {children}
        </CitiesContext.Provider>
    )
}

export { CitiesProvider }