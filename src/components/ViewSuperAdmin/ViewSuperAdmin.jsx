import Aside from './Aside/Aside';
import style from './viewSuperAdmin.module.css'

import { useLocation } from 'react-router-dom';

import Dashboard from './MainComponents/Dashboard/Dashboard'

const viewSuperAdmin = () => {
    const locationDashboard = useLocation().pathname.includes("/viewSuperAdmin/dashboard");


    return (<>
        <div className={style.container}>
            <Aside />
            <main className={style.container_main}>
                {locationDashboard ? <Dashboard /> : null}
            </main>
        </div>
    </>);
}

export default viewSuperAdmin;