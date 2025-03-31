import axios from 'axios';
axios.defaults.withCredentials = true;

// const hostBackend = 'https://api-incloowe.vercel.app/api/v1'
const hostBackend = 'http://localhost:5000/api/v1'

export const getContainers = async () => {
    try {
        const response = await axios.get(hostBackend + '/containers');
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error fetching containers:", error);
        throw error; // Opcional: lançar o erro para tratar em outro lugar
    }
};

export const getButtons = async () => {
    try {
        const response = await axios.get(hostBackend + '/buttons');
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error fetching containers:", error);
        throw error; // Opcional: lançar o erro para tratar em outro lugar
    }
};

export const getQueries = async () => {
    try {
        const response = await axios.get(hostBackend + '/queries');
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error fetching containers:", error);
        throw error; // Opcional: lançar o erro para tratar em outro lugar
    }
};

export const check = async () => {
    try {
        // Adiciona o cabeçalho X-Host com o host da aplicação X
        const response = await axios.get(hostBackend + '/check');
        console.log(response);
        return response.data.message;
    } catch (error) {
        console.error("Error fetching containers:", error);
        throw error; // Opcional: lançar o erro para tratar em outro lugar
    }
};

export const auth = async () => {
    try {
        // Adiciona o cabeçalho X-Host com o host da aplicação X
        const response = await axios.get(hostBackend + '/auth');
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error authentication:", error);
        return false;
    }
};