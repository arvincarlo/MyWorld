import {useSearchParams, useNavigate} from 'react-router-dom';
import { MapContainer, TileLayer, Popup, Marker, useMap, useMapEvents } from 'react-leaflet';
import {useState, useEffect} from 'react';
import {useCities} from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';

import styles from './Map.module.css';
import Button from './Button';
function Map() {
    const [searchParams] = useSearchParams();
    const {cities, flagemojiToPNG} = useCities();
    const [mapPosition, setMapPosition] = useState([14, 50]);
    const {
        isLoading: isLoadingPosition,
        position: geolocationPosition,
        getPosition,
    } = useGeolocation();
    
    const mapLat = searchParams.get('lat');
    const mapLng = searchParams.get('lng');

    useEffect(function() {
        if (mapLat, mapLng) {
            setMapPosition([mapLat, mapLng]);
        }
    }, [mapLat, mapLng]);

    useEffect(function() {
        if (geolocationPosition) {
            setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
        }
    }, [geolocationPosition]);

    return (
        <div className={styles.mapContainer}>
            {!geolocationPosition && <Button type='position' onClick={getPosition}>{isLoadingPosition ? 'Loading...' : 'Use your position'}</Button>}
            {/* <button onClick={() => setSearchParams(), setMapPosition()}></button> */}
            <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map(city => (
                    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                        <Popup>
                            <span>{flagemojiToPNG(city.emoji)}</span>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={mapPosition}></ChangeCenter>
                <DeteckClick/>
            </MapContainer>
        </div>
    )
}

function ChangeCenter({position}) {
    const map = useMap();
    map.setView(position);

    return null;
}

function DeteckClick() {
    const navigate = useNavigate();
    useMapEvents({
        click: e => {
            console.log(e);
            // Interacting with the Map
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
        }
    });
}

export default Map
