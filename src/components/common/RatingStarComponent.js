import React from 'react';
import "../../css/mypageReviewComponent.css";

const RatingStarCompoent = ({ score }) => {
    const fullStars = Math.floor(score / 2);
    const halfStar = (score % 2) >= 1 ? 1 : 0;

    return (
        <div id="rate">
            {Array(fullStars).fill().map((_, index) => (
                <span key={index} className="star">&#xf005;</span> // 전체 별
            ))}
            {halfStar === 1 && (
                <span className="star">&#xf089;</span> // 반 별
            )}
        </div>
    );
};

export default RatingStarCompoent;
