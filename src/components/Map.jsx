import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Popup, Marker, useMap, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';
import { useUrlPosition } from '../hooks/useUrlPosition';

import styles from './Map.module.css';
import Button from './Button';
function Map() {
    const [mapPosition, setMapPosition] = useState([14.55, 121.01]);
    const {
        isLoading: isLoadingPosition,
        position: geolocationPosition,
        getPosition,
    } = useGeolocation();
    const {cities, flagemojiToPNG} = useCities();
    const [mapLat, mapLng] = useUrlPosition();
    
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
                <DetectClick/>
            </MapContainer>
        </div>
    )
}

function ChangeCenter({position}) {
    const map = useMap();
    map.setView(position);

    return null;
}

function DetectClick() {
    const navigate = useNavigate();
    useMapEvents({
        click: e => {
            // Interacting with the Map
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
        }
    });
}

export default Map
