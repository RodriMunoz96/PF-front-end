import React from 'react';

const StarsRating = ({ satisfaction }) => {
    const renderStars = () => {
        const fullStars = Math.floor(satisfaction);
        const halfStar = satisfaction % 1 !== 0;
        const emptyStars = 5 - Math.ceil(satisfaction);

        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i}>&#9733;</span>); // Representa una estrella sólida
        }

        if (halfStar) {
            stars.push(<span key="half">&#9734;&#9733;</span>); // Representa una mitad de estrella
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty${i}`}>&#9734;</span>); // Representa una estrella vacía
        }

        return stars;
    };

    return <div >{renderStars()}</div>;
};

export default StarsRating;