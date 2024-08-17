// import axios from "axios";

// export const verifyUser = async () => {
//     try {
//         const result = await axios.post("http://localhost:5555/profile", {}, {
//             headers: {
//                 "Authorization": `Bearer ${localStorage.getItem("token")}`
//             }
//         });
//         console.log("User result", result);
//         return result
//     } catch (e) {
//         console.error("Something went wrong", e.message);
//     }
// };

import axios from "axios";
import { loggedIn } from '../../store/reducers/authSlice';

export const verifyUserThunk = () => {
    return async (dispatch) => {
        try {
            const result = await axios.post("http://localhost:5555/profile", {}, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            // Dispatch the loggedIn action with the user data
            dispatch(loggedIn(result.data.user));
            return result;
        } catch (e) {
            console.error("Something went wrong", e.message);
            return null;  // or you can handle this as you need
        }
    };
};
