import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import styles from './AppLayout.module.css'
import User from '../components/User';
import { useAuth } from "../contexts/FakeAuthContext";

function AppLayout() {
    const {isAuthenticated} = useAuth();

    return (
        <div className={styles.app}>
            <Sidebar></Sidebar>
            <Map></Map>
            {isAuthenticated && <User/>}
        </div>
    )
}

export default AppLayout
