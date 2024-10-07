import styles from './Map.module.css'
import {useSearchParams, useNavigate} from 'react-router-dom';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import {useState} from 'react';

function Map() {
    /*eslint-disable*/
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const [mapPosition, setMapPosition] = useState([40, 0]);
    
    return (
        <div className={styles.mapContainer}>
            {/* <button onClick={() => setSearchParams(), setMapPosition()}></button> */}
            <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={mapPosition}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map
