import style from './links.module.css';
import { useLocation, NavLink } from 'react-router-dom';

function Links({ url, img, name }) {
    const location = useLocation().pathname.includes(`/viewParent/${url}`)

    return (<>
        <NavLink to={url === '/login' ? '/login' : `/viewParent/${url}`} className={style.navlink}>
            <div className={`${location ? style.dashboard_not_linked : style.dashboard_linked}`}>
                <h2>{name}</h2>
                <img src={img} alt={name} />
            </div>
        </NavLink>
    </>)
}

export default Links