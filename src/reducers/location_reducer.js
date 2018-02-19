import {
    LOCATION_UPDATE,
    LOCATION_CREATE,
    LOCATION_SAVE_SUCCESS
  } from '../actions/types';
  
  const INITIAL_STATE = {
    name: 'Mantra',
    location: 'Azusa CA'
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case LOCATION_UPDATE:
        return { ...state, [action.payload.prop]: action.payload.value };
      case LOCATION_CREATE:
        return INITIAL_STATE;
      case LOCATION_SAVE_SUCCESS:
        return INITIAL_STATE;
      default:
        return state;
    }
  };