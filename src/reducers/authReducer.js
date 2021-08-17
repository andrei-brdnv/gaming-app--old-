
const initState = {
    authError: null,
    list: []
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR':
            console.log('login error');
            return {
                ...state,
                authError: 'Login failed'
            }
        case 'LOGIN_SUCCESS':
            console.log('login success');
            return {
                authError: null
            }
        case 'SIGNOUT_SUCCESS':
            return state
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            return {
                ...state,
                authError: action.err.message
            }

        case 'ADDGAME_SUCCESS':
            return {
                ...state
            }

        case 'ADDGAME_ERROR':
            return state

        case 'FETCHFAV_SUCCESS':
            return {
                ...state,
                list: action.payload
            }
        default:
            return state
    }
};

export default authReducer;