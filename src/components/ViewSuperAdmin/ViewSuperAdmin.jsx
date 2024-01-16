import Aside from './Aside/Aside';
import style from './viewSuperAdmin.module.css'

import { useLocation } from 'react-router-dom';

import Dashboard from './MainComponents/Dashboard/Dashboard'
import AdminForm from './MainComponents/Dashboard/Admins/AdminForm/AdminForm';
import GradeForm from './MainComponents/Dashboard/Grades/GradeForm/GradeForm';

const viewSuperAdmin = () => {
    const locationDashboard = useLocation().pathname.includes("/viewSuperAdmin/dashboard");
    const locationAdmins = useLocation().pathname.includes("/viewSuperAdmin/admins");
    const locationGrades = useLocation().pathname.includes("/viewSuperAdmin/grades");


    return (<>
        <div className={style.container}>
            <Aside />
            <main className={style.container_main}>
                {locationDashboard ? <Dashboard /> : null}
                {locationAdmins ? <AdminForm /> : null}
                {locationGrades ? <GradeForm /> : null}
            </main>
        </div>
    </>);
}

export default viewSuperAdmin;