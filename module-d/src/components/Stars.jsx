import React from "react";

const Stars = ({ rating, className }) => {
    const filledStars = Math.round(rating);

    return (
        <div className={"flex gap-2 " + className}>
            {Array.from(new Array(filledStars)).map((val, index) => (
                <img 
                    src="/assets/Star Icon@3x.png"
                    alt="starrr" 
                    style={{width: "20px", height: "20px"}}
                    className="inline aspect-square" 
                    key={index}
                />
            ))}
            {Array.from(new Array(5 - filledStars)).map((val, index) => (
                <img 
                    src="/assets/Star Icon@3x-black.png"
                    alt="starrr" 
                    style={{width: "20px", height: "20px"}}
                    className="inline aspect-square" 
                    key={index}
                />
            ))}
        </div>
    );
}

export default Stars;