import {useParams} from 'react-router-dom';

const formatDate = (date) => 
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long"
  }).format(new Date(date));

function City() {
  const {id} = useParams();

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
    </div>
  )
}

export default City
