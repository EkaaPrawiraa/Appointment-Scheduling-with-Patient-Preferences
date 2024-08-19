import React, { createContext, useState, useEffect } from 'react';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
    const [isOpenAppointment, setIsOpenAppointment] = useState(false);
    const [timer, setTimer] = useState(null);
    const [appointmentId, setAppointmentId] = useState(0);

    const incrementAppointmentId = () => {
        setAppointmentId(prevId => prevId + 1);
    };

    const openRegistration = (duration = 600000) => { 
        localStorage.setItem('registrationOpen', 'true');
        setIsOpenAppointment(true);

        if (timer) {
            clearTimeout(timer);
        }

        const timeoutId = setTimeout(() => {
            localStorage.setItem('registrationOpen', 'false');
            setIsOpenAppointment(false);
            incrementAppointmentId();  
        }, duration);

        setTimer(timeoutId);
    };

    const closeRegistration = () => {
        localStorage.setItem('registrationOpen', 'false');
        setIsOpenAppointment(false);

        if (timer) {
            clearTimeout(timer);
        }

        incrementAppointmentId();  
    };

    useEffect(() => {
        const isOpen = localStorage.getItem('registrationOpen') === 'true';
        setIsOpenAppointment(isOpen);

        return () => {
            localStorage.removeItem('registrationOpen');
        };
    }, []);

    return (
        <TimerContext.Provider value={{ 
            isOpenAppointment, 
            openRegistration, 
            closeRegistration, 
            appointmentId  
        }}>
            {children}
        </TimerContext.Provider>
    );
};
