import {useParams, useSearchParams} from 'react-router-dom';

/*eslint-disable*/

const formatDate = (date) => 
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long"
  }).format(new Date(date));

function City() {
  const {id} = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

  // TEMP DATA
  const currentCity = {
    cityName: "Lisbon",
    emoji: "Lisbon",
    date: "2014-",
    notes: "My favorite city so far"
  }

  return (
    <div>
      Main City {id}
      <p>Position: {lng} {lat}</p>
    </div>
  )
}

export default City
