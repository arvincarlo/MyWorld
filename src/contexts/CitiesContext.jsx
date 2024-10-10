import { createContext, useContext, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = 'http://localhost:9000';
const CitiesContext = createContext();

function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

    useEffect(function () {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const response = await fetch(`${BASE_URL}/cities`);
                const data = await response.json();
                setCities(data);
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, []);
    
    async function getCity(id) {
        try {
            setIsLoading(true);
            const response = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await response.json();
            setCurrentCity(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }
    
    async function createCity(newCity) {
        try {
            setIsLoading(true);
            const response = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setCities(cities => [...cities, data]);
            toast.success(`Successfully added ${data.cityName}.`);
        } catch (err) {
            toast.error(err)
        } finally {
            setIsLoading(false);
        }
    }
    
    async function deleteCity(id) {
        try {
            setIsLoading(true);
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE'
            });
            // Removing the city from the city array
            setCities(cities => cities.filter(city => city.id !== id));
            toast.success(`Successfully removed city.`);
        } catch (err) {
            toast.error(err)
        } finally {
            setIsLoading(false);
        }
    }

    function flagemojiToPNG(flag) {
        const countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt()).map(char => String.fromCharCode(char-127397).toLowerCase()).join('')
        return (<img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />)
    }

    return (
        <CitiesContext.Provider value={{
            cities, 
            isLoading,
            currentCity,
            getCity,
            flagemojiToPNG,
            createCity,
            deleteCity
        }}>
            {children}
            <ToastContainer></ToastContainer>
        </CitiesContext.Provider>
        
    )
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) {
        throw new Error('Cities context was used outside the cities Provider');
    }
    return context;
}


export { CitiesProvider, useCities }