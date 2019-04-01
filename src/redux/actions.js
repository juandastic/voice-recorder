import Axios from 'axios';
import { normalize } from 'normalizr';
import { voicesListSchema, voice } from '../schemas';

/*
 * action types
 */

export const ADD_VOICE = 'ADD_VOICE'
export const EDIT_VOICE = 'EDIT_VOICE'
export const DELETE_VOICE = 'DELETE_VOICE'
export const SET_VOICES = 'SET_VOICES'

/*
 * action creators
 */

export function addVoiceAction(data) {
  return { type: ADD_VOICE, payload: data }
}

export function editVoiceAction(data) {
  return { type: EDIT_VOICE, payload: data }
}

export function deleteVoiceAction(id) {
  return { type: DELETE_VOICE, payload: { id } }
}

export function setVoicesAction(data) {
  return { type: SET_VOICES, payload: data }
}

export function fetchVoices() {
  return async (dispatch) => {
    const result = await Axios.get('/voices/');
    const normalizeData = normalize(result.data, voicesListSchema);
    dispatch(setVoicesAction(normalizeData));
  }
}

export function deleteVoice(id) {
  return async (dispatch) => {
    await Axios.delete(`/voices/${id}`);
    dispatch(deleteVoiceAction(id));
  }
}

export function addVoice(formObject) {
  return async (dispatch) => {
    const result = await Axios.post('/voices/add', formObject);
    const normalizeData = normalize(result.data, voice);
    dispatch(addVoiceAction(normalizeData));
  }
}

export function editVoice(voiceId, formObject) {
  return async (dispatch) => {
    const result = await Axios.post(`/voices/${voiceId}`, formObject);
    const normalizeData = normalize(result.data, voice);
    dispatch(editVoiceAction(normalizeData));
  }
}
