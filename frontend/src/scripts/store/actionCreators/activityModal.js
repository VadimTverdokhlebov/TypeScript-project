import { SHOW_MODAL, REMOVE_MODAL } from '../constants/actionTypes.js';

export function activityModal(activity) {

    if (activity) {
        return {
            type: SHOW_MODAL,
            activity
        };
    }

    if (!activity) {
        return {
            type: REMOVE_MODAL,
            activity
        };
    }

}

