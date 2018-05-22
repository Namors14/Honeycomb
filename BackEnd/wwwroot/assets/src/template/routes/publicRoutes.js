import { Login } from '../../publicComponents/Login';
import { Register } from '../../publicComponents/Register';
import { Forgot } from '../../publicComponents/Forgot';
import  ConfirmEmail  from '../../publicComponents/ConfirmEmail';
import  RecoveryPassword  from '../../publicComponents/RecoveryPassword';
import  RecoveryForm  from '../../publicComponents/RecoveryForm';

export default {
    Login: {
        component: Login,
        path: '/'
    },
    Register: {
        component: Register,
        path: '/register'
    },
    Forgot: {
        component: Forgot,
        path: '/forgot'
    },
    ConfirmEmail: {
        component: ConfirmEmail,
        path: '/email-confirm'
    },
    RecoveryPassword: {
        component: RecoveryPassword,
        path: '/recovery-password'
    },
    RecoveryForm: {
        component: RecoveryForm,
        path: '/reset-password'
    },
};