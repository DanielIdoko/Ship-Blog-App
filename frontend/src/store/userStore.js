import { create }from 'zustand';
import axios from 'axios';
import { URL } from '../url';



const userStore = create((set) => ({
    user: null,
    loading: false,
    errorMessage: '',
    getUser: async (userId) => {
        set({loading: true, errorMessage: ''})

        // fetch user data
        try {
            const response = await axios.post(`${URL}/api/auth/refetch`, {
                headers: {'Content-Type': 'application/json'},
            }, {withCredentials: true})
            set({user: response.data, loading: false})
        } catch (error) {
            set({errorMessage: error, loading: false})
        }
    }
}))

export default userStore;