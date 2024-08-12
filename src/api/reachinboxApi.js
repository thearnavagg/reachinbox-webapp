import axios from 'axios';

const getToken = () => localStorage.getItem('token');

export const fetchMails = async () => {
    const token = getToken();
    try {
        const response = await axios.get('https://hiring.reachinbox.xyz/api/v1/onebox/list', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('API Response:', response);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching mails:', error);
        return [];
    }
};




export const resetData = async () => {
    const token = getToken();
    try {
        const response = await axios.get('https://hiring.reachinbox.xyz/api/v1/onebox/reset', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error resetting data:', error);
        return null;
    }
};

export const replyToEmail = async (threadId, replyData) => {
    const token = getToken();
    try {
        const response = await axios.post(
            `https://hiring.reachinbox.xyz/api/v1/onebox/reply/${threadId}`,
            replyData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data.data;
    } catch (error) {
        console.error('Error replying to email:', error);
        return null;
    }
};

export const getThreadMessages = async (threadId) => {
    const token = getToken();
    try {
        const response = await axios.get(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${threadId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching thread messages:', error);
        return [];
    }
};

export const deleteThread = async (threadId) => {
    const token = getToken();
    try {
        const response = await axios.delete(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${threadId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error deleting thread:', error);
        return null; r
    }
};
