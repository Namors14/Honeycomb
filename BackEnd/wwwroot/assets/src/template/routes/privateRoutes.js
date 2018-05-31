import { Profile } from '../../privateComponents/Profile';
import { Settings } from '../../privateComponents/Settings';
import { Calendars } from '../../privateComponents/Calendar';
import { AdminPanel } from '../../adminComponents/AdminPanel'

export default {
    Profile: {
        component: Profile,
        path: '/profile'
    },
    Settings: {
        component: Settings,
        path: '/settings'
    },
    Calendars: {
        component: Calendars,
        path: '/calendar'
    },
    AdminPanel: {
        component: AdminPanel,
        path: '/adminpanel'
    },
    
};