const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

export const apiGet = async (endpoint) => {
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            credentials: 'include',
        });
        return await res.json();
    } catch (error) {
        console.error("API GET Error:", error);
        throw error;
    }
};

export const apiPost = async (endpoint, data) => {
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });
        return await res.json();
    } catch (error) {
        console.error("API POST Error:", error);
        throw error;
    }
};

export const apiPut = async (endpoint, data) => {
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });
        return await res.json();
    } catch (error) {
        console.error("API PUT Error:", error);
        throw error;
    }
};

export const apiDelete = async (endpoint) => {
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: "DELETE",
            credentials: 'include',
        });
        return await res.json();
    } catch (error) {
        console.error("API DELETE Error:", error);
        throw error;
    }
};
