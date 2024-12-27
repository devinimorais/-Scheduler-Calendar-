import React from 'react'
import errorImage from '../../assets/img/error-404.jpg';

const NotFound: React.FC = () => {
    return (
        <div className="relative min-h-screen">

            <div className="absolute left-0 right-0 text-center text-red-700 font-bold"
                style={{
                    top: "2%",
                }}>
                <div className="p-6  max-w-lg mx-auto">
                    <span className="text-4xl mr-2">⚠️</span>
                    <p className="text-lg md:text-2xl">
                        <strong>Link informado não é válido.</strong><br />
                        Por favor, entre contato com suporte.
                    </p>
                </div>
            </div>

            <div
                className="flex items-center justify-center min-h-screen bg-center bg-no-repeat bg-contain"
                style={{
                    backgroundImage: `url(${errorImage})`,
                    backgroundSize: "40%",
                }}
            />
        </div>
    );
}

export default NotFound