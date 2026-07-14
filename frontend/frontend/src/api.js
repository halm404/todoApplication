const API_URL = "http://localhost:8000/api";

export async function refreshAccessToken() {
    const refresh = localStorage.getItem("refresh");

    if (!refresh) {
        return null;
    }

    const response = await fetch(`${API_URL}/token/refresh/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            refresh,
        }),
    });

    if (!response.ok) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        return null;
    }

    const data = await response.json();

    localStorage.setItem("access", data.access);

    return data.access;
}

export async function authenticatedFetch(url, options = {}) {

    let access = localStorage.getItem("access");

    let response = await fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${access}`,
        },
    });

    if (response.ok) {
        return response;
    }

    if (response.status !== 401 && response.status !== 403) {
        return response;
    }

    access = await refreshAccessToken();

    if (!access) {
        window.location.href = "/login";
        return response;
    }

    return fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${access}`,
        },
    });
}