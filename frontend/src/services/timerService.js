import React, { createContext, useState, useEffect } from 'react';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
    const [isOpenAppointment, setIsOpenAppointment] = useState(false);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        if (isOpenAppointment) {
            const timeoutId = setTimeout(() => {
                setIsOpenAppointment(false);
                localStorage.setItem('registrationOpen', 'false');
            }, 600000);

            setTimer(timeoutId);
        } else {
            clearTimeout(timer);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [isOpenAppointment]);

    const openRegistration = () => {
        localStorage.setItem('registrationOpen', 'true');
        setIsOpenAppointment(true);
    };

    const closeRegistration = () => {
        clearTimeout(timer);
        localStorage.setItem('registrationOpen', 'false');
        setIsOpenAppointment(false);
    };

    useEffect(() => {
        const isOpen = localStorage.getItem('registrationOpen') === 'true';
        setIsOpenAppointment(isOpen);

        return () => {
            localStorage.removeItem('registrationOpen');
        };
    }, []);

    return (
        <TimerContext.Provider value={{ isOpenAppointment, openRegistration, closeRegistration }}>
            {children}
        </TimerContext.Provider>
    );
};
