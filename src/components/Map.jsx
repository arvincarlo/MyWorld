import styles from './Map.module.css'
import {useSearchParams, useNavigate} from 'react-router-dom';

function Map() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    return (
        <div className={styles.mapContainer} onClick={() => navigate("form")}>
            Map
            <h1>Positions: {lat} {lng}</h1>
            <button onClick={() => setSearchParams({lat: 23, lng:43})}>Change Position</button>
        </div>
    )
}

export default Map
