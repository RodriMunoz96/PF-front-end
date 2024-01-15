import style from './mainHome.module.css'
import niños from '../../Img/niños.jpg'
import factura from '../../Img/facturacion.png'
import pasarela from '../../Img/pasarelaDePago.png'
import mensajeria from '../../Img/mensajeria.png'

function MainHome() {
    return (<>
        <main className={style.main}>
            <div className={style.container_to_about_us}>
                <div className={style.container_about_us}>
                    <div>
                        <img src={niños} alt="imagen referencial" />
                    </div>
                    <div>
                        <h2>¿Quiénes somos?</h2>
                        <p> Somos una plataforma educativa que nace con la visión de transformar la experiencia
                            educativa en instituciones de todos los tamaños. Nos dedicamos a proporcionar soluciones
                            integrales para la gestión, comunicación y aprendizaje en entornos educativos.</p>
                    </div>
                </div>
            </div>
            <div className={style.container_to_offers}>
                <div className={style.container_offers}>
                    <h2>¿Qué te ofrecemos?</h2>
                    <div className={style.offers}>
                        <div className={style.offers_detail}>
                            <img src={factura} alt="Facturación Electrónica" />
                            <h3>Facturación Electrónica</h3>
                            <p>
                                Como usuario de DataCole la emisión de facturas electrónicas están vinculadas con la sunat, lo cual ahorrará el tiempo y costo para realizar su gestión contable.
                            </p>
                        </div>
                        <div className={style.offers_detail}>
                            <img src={pasarela} alt="Pasarela de Pago" />
                            <h3>Pasarela de Pago</h3>
                            <p>
                                Podrás realizar todos tus pagos como matrícula, pensiones, uniforme, paquetes escolares, etc, utilizando tu tarjeta crédito o débito.
                            </p>
                        </div>
                        <div className={style.offers_detail}>
                            <img src={mensajeria} alt="Sistema de mensajería" />
                            <h3>Sistema de mensajería</h3>
                            <p>
                                Contamos con nuestro servidor de mensajería dedicado para impartir la gestión en nuestros módulos que asegura la eficacia de este servicio al 100%.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>);
}

export default MainHome;