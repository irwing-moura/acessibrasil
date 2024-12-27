import axios from 'axios';

const hostBackend = 'https://api-incloowe.vercel.app/api/v1'

export const getContainers = async (domain) => {
    try {
        const response = await axios.post(hostBackend + '/containers', {
            domain
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error fetching containers:", error);
        throw error; // Opcional: lançar o erro para tratar em outro lugar
    }
};

export const getButtons = async (domain) => {
    try {
        const response = await axios.post(hostBackend + '/buttons', {
            domain
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error fetching containers:", error);
        throw error; // Opcional: lançar o erro para tratar em outro lugar
    }
};
