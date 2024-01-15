import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from './carrousel.module.css'
import StarsRating from './StarsRating'
const { VITE_BACK_URL } = import.meta.env;

const CarrouselComentarios = () => {
    const [comentarios, setComentarios] = useState([]);

    useEffect(() => {
        fetch(`${VITE_BACK_URL}/valoracion`)
            .then((response) => response.json())
            .then((data) => setComentarios(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 3,
        slidesToScroll: 3,
    };

    const changeDate = (date) => {
        const fechaConvertida = new Date(date);

        const dia = fechaConvertida.getDate().toString().padStart(2, '0');
        const mes = (fechaConvertida.getMonth() + 1).toString().padStart(2, '0'); // Nota: Los meses son indexados desde 0
        const año = fechaConvertida.getFullYear().toString().slice(-2);

        const fechaFormateada = `${dia}/${mes}/${año}`;

        return fechaFormateada
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ textAlign: "center" }} className={style.container_slide}>
                <h2>Lo que dicen nuestros usuarios</h2>
                <Slider {...settings} >
                    {comentarios.map((comment) => (
                        <div className={style.container_cont_details}>
                            <div key={comment.id} className={style.container_details}>
                                <div className={style.container_details_first}>
                                    <b>Nivel de satisfacción: </b>
                                    <StarsRating satisfaction={comment.satisfaction} />
                                    <b>{changeDate(comment.createdAt)}</b>
                                </div>
                                <h5><b>Facilidad de Uso:</b> {comment.easeOfUse}</h5>
                                <h5><b>Proceso de Registro:</b> {comment.registrationProcess}</h5>
                                <h5><b>Interfaz de Usuario:</b> {comment.userInterface}</h5>
                                <h5><b>Recomendación:</b> {comment.recommendation ? "Si" : "No"}</h5>
                                <h5><b>Comentarios Adicionales:</b> {comment.additionalComments}</h5>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div >
    );
};

export default CarrouselComentarios;
