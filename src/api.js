import axios from 'axios';

const hostBackend = 'https://api-incloowe.vercel.app/api/v1'
// const hostBackend = 'http://localhost:5000/api/v1'

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
