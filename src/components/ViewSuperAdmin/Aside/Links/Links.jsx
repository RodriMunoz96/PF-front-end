import style from './links.module.css';
import { useLocation, NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap'

function Links({ url, img, name }) {
    const location = useLocation().pathname.includes(`/viewSuperAdmin/${url}`)

    return (<>
        <Button>
            <NavLink to={url === '/login' ? '/login' : `/viewSuperAdmin/${url}`} className={style.navlink}>
                <div className={`${location ? style.dashboard_not_linked : style.dashboard_linked}`}>
                    <h2>{name}</h2>
                    <img src={img} alt={name} />
                </div>
            </NavLink>
        </Button>
    </>)
}

export default Links