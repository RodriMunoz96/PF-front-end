import style from './navbar.module.css'
import { NavLink } from 'react-router-dom'
import img from '../../Img/EasySchool.png'

function Navbar() {
    return (<>
        <nav className={style.navbar}>
            <div className={style.container_navbar}>
                <div className={style.container_logo}>
                    <img src={img} alt="imagen" />

                </div>
                <div className={style.div_links}>
                    <NavLink className={style.links} to={'/'}>Home</NavLink>
                    <NavLink className={style.links} to={'/testimonios'}>Testimonios</NavLink>
                    <NavLink className={style.links} to={'/login'}>Ingresar</NavLink>
                </div>
            </div>
        </nav>
    </>);
}

export default Navbar;