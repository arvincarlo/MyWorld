import styles from './CountryList.module.css'
import CountryItem from './CountryItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import Message from './Message';

function CountryList({ cities, isLoading }) {
    if (isLoading) return <Spinner />;
    if (!cities.length) return <Message message="Add a new city by clicking on a city on the map"/>

    const countries = cities.reduce((accumulator, city) => {
        if (!accumulator.map(element => element.country).includes(city.country)) {
            return [...accumulator, {country: city.country, emoji: city.emoji, id: city.id}];
        } else {
            return accumulator;
        }
    }
    , []);

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

