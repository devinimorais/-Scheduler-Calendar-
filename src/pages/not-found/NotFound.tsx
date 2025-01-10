import React from 'react';
import errorImage from '../../assets/svg/error.svg';

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-red'">
            <div
                className="bg-center bg-no-repeat bg-contain w-full h-64 md:h-80 lg:h-96 xl:h-[500px]"
                style={{
                    backgroundImage: `url(${errorImage})`,
                }}
            />
            <div className="mt-6 text-center font-sans text-black ">
                <p className="text-lg md:text-2xl lg:text-3xl">
                    <strong>Link informado não é válido.</strong>
                </p>
                <p className="text-sm md:text-lg lg:text-xl mt-2">
                    Por favor, entre em contato com o suporte.
                </p>
            </div>
        </div>
    );
};

export default NotFound;
