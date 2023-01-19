import axios from "./axios";

export async function getUsers() {
    const response = await axios.get("user");

    if (response.status >= 200 && response.status <= 299)
        return response.data;

    return new Error(
        "Não foi possível carregar os dados. Código do erro: " + response.status
    );
}

export async function getPayments() {
    const response = await axios.get("payments");

    if (response.status >= 200 && response.status <= 299)
        return response.data;

    return new Error(
        "Não foi possível carregar os dados. Código do erro: " + response.status
    );
}

export async function getPaymentTypes() {
    const response = await axios.get("paymentType");

    if (response.status >= 200 && response.status <= 299)
        return response.data;

    return new Error(
        "Não foi possível carregar os dados. Código do erro: " + response.status
    );
}