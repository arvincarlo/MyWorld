import { createContext, useContext, useEffect, useReducer, useCallback} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = 'http://localhost:9000';
const CitiesContext = createContext();
const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: ''
}

function reducer(state, action) {
    switch(action.type) {
        case 'loading':
            return {
                ...state,
                isLoading: true
            }
        case 'cities/loaded':
            return {
                ...state,
                isLoading: false,
                cities: action.payload
            }
        case 'city/loaded':
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload
            }
        case 'city/created':
            return {
                ...state,
                isLoading: false,
                cities: [
                    ...state.cities,
                    action.payload
                ],
                currentCity: action.payload
            }
        case 'city/deleted': 
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(city => city.id !== action.payload),
                currentCity: action.payload
            }
            
        case 'rejected':
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default: throw new Error('Unkown action type');
    }
}

function CitiesProvider({ children }) {
    const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(reducer, initialState);

    // Derived countries from cities
    const countries = cities.reduce((accumulator, city) => {
        if (!accumulator.map(element => element.country).includes(city.country)) {
            return [...accumulator, {country: city.country, emoji: city.emoji, id: city.id}];
        } else {
            return accumulator;
        }
    }, []);

    useEffect(function () {
        async function fetchCities() {
            dispatch({type: 'loading'});
            try {
                const response = await fetch(`${BASE_URL}/cities`);
                const data = await response.json();
                if (data) dispatch({type: 'cities/loaded', payload: data});
            }
            catch (error) {
                dispatch({type: 'rejected', payload: "There was an error in fetching the cities"});
            }
        }
        fetchCities();
    }, []);
    
    const getCity = useCallback(async function getCity(id) {
        if (id === currentCity.id) return;
        dispatch({type: 'loading'});
        try {
            const response = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await response.json();
            dispatch({type: 'city/loaded', payload: data});
        } catch (error) {
            dispatch({type: 'rejected', payload: "There was an error loading the city"})
        }
    }, [currentCity.id]);
    
    async function createCity(newCity) {
        dispatch({type: 'loading'});
        try {
            const response = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            dispatch({type: 'city/created', payload: data});
            toast.success(`Successfully added ${data.cityName}.`);
        } catch (error) {
            toast.error(error);
            dispatch({type: 'rejected', payload: error});
        }
    }
    
    async function deleteCity(id) {
        dispatch({type: 'loading'});
        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE'
            });
            // Removing the city from the city array
            dispatch({type: 'city/deleted', payload: id});
            toast.success(`Successfully removed city.`);
        } catch (error) {
            dispatch({type: 'rejected', payload: error});
            toast.error(error);
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
            deleteCity,
            error, 
            countries
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
// test commit