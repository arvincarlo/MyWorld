import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useCities} from '../contexts/CitiesContext'
import styles from './City.module.css'

import BackButton from './BackButton';
import Spinner from './Spinner';

function City() {
  const {id} = useParams();
  const {getCity, currentCity, isLoading, flagemojiToPNG} = useCities();
  const {cityName, emoji, notes} = currentCity;
  console.log(currentCity);

  useEffect(function() {
    getCity(id);
  }, [id]);
  
  if (isLoading) return <Spinner></Spinner>;
  
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City Name</h6>
        <h3>
          <span>{flagemojiToPNG(emoji)}</span> {cityName}
        </h3>
      </div>
      <div className={styles.row}>
        <h6>Your notes</h6>
        <p>{notes}</p>
      </div>
      <div className={styles.row}>
        <h6>Learn More</h6>
        <a href={`https://en.wikipedia.org/wiki/${cityName}`} target="_blank" rel="noreferrer">
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
      <div>
        <BackButton></BackButton>
      </div>
    </div>
  )
}

export default City
