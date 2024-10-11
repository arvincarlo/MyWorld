import styles from './AppNav.module.css';
import { NavLink } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';

function AppNav() {
    const { cities, countries } = useCities();
    
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <NavLink to='cities'>Cities {cities.length > 0 && `(${cities.length})`}</NavLink>
                </li>
                <li>
                    <NavLink to='countries'>Countries {countries.length > 0 && `(${countries.length})`}</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default AppNav
