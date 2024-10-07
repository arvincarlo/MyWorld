import styles from './CityList.module.css'
import CityItem from './CityItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import Message from './Message';
import {useCities} from '../contexts/CitiesContext';

function CityList() {
    const {cities, isLoading} = useCities();
    if (isLoading) return <Spinner />;
    if (!cities.length) return <Message message="Add a new city by clicking on a city on the map"/>
    return (
        <ul className={styles.cityList}>
            {cities.map(city => <CityItem key={city.id} city={city}/>)}
        </ul>
    );
}

export default CityList

CityList.propTypes = {
    cities: PropTypes.array,
    isLoading: PropTypes.bool
}

