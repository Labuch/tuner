import React from 'react';

const colorGradient = (cents) => {
    return Math.abs(cents) >= 10 ? 'red' : 'green'
};
const colorStroke = (cents) => {
    return Math.abs(cents) >= 10 ? 'white' : 'green'
};
const xLine = (cents) => {
    return 150 * (1 + cents / 100);
};

const Jauge = (props) => {

    return (
        <div className='tuner-jauge'>
            <svg width="300" height="100" fill="url(#Gradient)" >
                <defs>
                    <linearGradient id="Gradient">
                        <stop stopColor={colorGradient(props.cents)} offset="0%" />
                        <stop stopColor="black" offset="30%" />
                        <stop stopColor="black" offset="70%" />
                        <stop stopColor={colorGradient(props.cents)} offset="100%" />
                    </linearGradient>
                </defs>
                <rect x='2' y='2' height="96" width="296" stroke="grey" strokeWidth="2" />
                <line x1={xLine(props.cents)} x2={xLine(props.cents)} y1="2" y2="98" stroke={colorStroke(props.cents)} strokeWidth="2" />
                <line x1="135" x2="135" y1="2" y2="98" stroke="red" strokeWidth="2" />
                <line x1="165" x2="165" y1="2" y2="98" stroke="red" strokeWidth="2" />
            </svg>
        </div>

    )
}

export default Jauge 