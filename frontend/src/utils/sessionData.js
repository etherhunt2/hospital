export const getSessionAppointments = () => {
    const data = sessionStorage.getItem("appointments");
    return data ? JSON.parse(data) : [];
};

export const createSessionAppointment = (appointment) => {
    const appointments = getSessionAppointments();
    appointments.push(appointment);
    sessionStorage.setItem("appointments", JSON.stringify(appointments));
    return appointment;
};

export const updateSessionAppointment = (id, updatedData) => {
    const appointments = getSessionAppointments();
    const index = appointments.findIndex(app => app.id === id);
    if (index !== -1) {
        appointments[index] = { ...appointments[index], ...updatedData };
        sessionStorage.setItem("appointments", JSON.stringify(appointments));
        return appointments[index];
    }
    return null;
};

export const deleteSessionAppointment = (id) => {
    let appointments = getSessionAppointments();
    appointments = appointments.filter(app => app.id !== id);
    sessionStorage.setItem("appointments", JSON.stringify(appointments));
};

export const getSessionPayments = () => {
    const data = sessionStorage.getItem("payments");
    return data ? JSON.parse(data) : [];
};

export const createSessionPayment = (payment) => {
    const payments = getSessionPayments();
    payments.push(payment);
    sessionStorage.setItem("payments", JSON.stringify(payments));
    return payment;
};
