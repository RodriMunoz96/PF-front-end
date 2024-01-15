import style from './aside.module.css'
import Links from './Links/Links';
import dashboard from '../../../Img/imgViewParent/dashboard.png'
import LogoutButton from "../../../peges/AdminPages/LogOut/LogOut";

const Aside = () => {
    return (<>
        <aside className={style.container_aside}>
            <div className={style.container_dad_name}>
                <h1>Bienvenido Super Admin</h1>
            </div>
            <hr />
            <div className={style.container_links}>
                <Links url={'dashboard'} img={dashboard} name={'Dashboard'} />
                <Links url={'admins'} img={dashboard} name={'Añadir admin'} />
                <Links url={'grades'} img={dashboard} name={'Añadir grado'} />
                <LogoutButton />
            </div>
        </aside>
    </>);
}

export default Aside;