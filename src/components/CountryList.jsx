import styles from './CountryList.module.css'
import CountryItem from './CountryItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import Message from './Message';
import {useCities} from '../contexts/CitiesContext';

function CountryList() {
    const {cities, countries, isLoading} = useCities();

    if (isLoading) return <Spinner />;
    if (!cities.length) return <Message message="Add a new city by clicking on a city on the map"/>

    return (
        <ul className={styles.countryList}>
            {countries.map(country => <CountryItem key={country.id} country={country}/>)}
        </ul>
    );
}

export default CountryList

CountryList.propTypes = {
    cities: PropTypes.array,
    isLoading: PropTypes.bool
}

