import CarrouselComentarios from '../CarrouselComentarios/CarrouselComentarios';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import style from './testimonios.module.css'

function Testimonios() {
    return (<>
        <div className={style.container}>
            <Navbar />
            <div className={style.container_carrousel}>
                <CarrouselComentarios />
            </div>
            <Footer />
        </div>
    </>);
}

export default Testimonios;