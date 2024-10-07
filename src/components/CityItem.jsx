import {Link} from 'react-router-dom';

import PropTypes from "prop-types";
import styles from './CityItem.module.css';
import {useCities} from '../contexts/CitiesContext';

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));

    
    function CityItem({city}) {
    const {cityName, emoji, date, id, position} = city;
    const {flagemojiToPNG, currentCity} = useCities();

    return (
        <li>
            <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`} className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ""}`}>
                <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>({formatDate(date)})</time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    )
}

export default CityItem

CityItem.propTypes = {
    city: PropTypes.object
}
