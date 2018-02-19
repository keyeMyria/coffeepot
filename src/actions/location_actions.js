import firebase from 'firebase';
import {
  LOCATION_UPDATE,
  LOCATION_CREATE,
  LOCATION_FETCH_SUCCESS,
  LOCATION_SAVE_SUCCESS
} from './types';

export const locationUpdate = ({ prop, value }) => {
  return {
    type: LOCATION_UPDATE,
    payload: { prop, value }
  };
};

export const locationCreate = ({ name, location }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/locations/`)
      .push({ name, location })
      .then(() => {
        dispatch({ type: LOCATION_CREATE });
        Actions.locationList({ type: 'reset' });/////////////
      });
  };
};

export const locationFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/locations/`)
      .on('value', snapshot => {
        dispatch({ type: LOCATION_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
/*
export const locationSave = ({ name, location }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/locations/${uid}`)
      .set({ name, location })
      .then(() => {
        dispatch({ type: location_SAVE_SUCCESS });
        Actions.locationList({ type: 'reset' });
      });
  };
};
*/
/*
export const locationDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/locations/${uid}`)
      .remove()
      .then(() => {
        Actions.employeeList({ type: 'reset' });
      });
  };
};*/