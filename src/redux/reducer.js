import { combineReducers } from 'redux'
import {
  ADD_VOICE,
  EDIT_VOICE,
  DELETE_VOICE,
  SET_VOICES
} from './actions'

const initialDataState = {
  entities: {},
  result: []
};

function data(state = initialDataState, action) {
  switch (action.type) {
    case SET_VOICES: {
      const data = action.payload;
      return {
        entities: data.entities,
        result: data.result
      }
    }
    case ADD_VOICE: {
      const data = action.payload;
      return {
        entities: {
          ...state.entities,
          voices: {
            ...state.entities.voices,
            ...data.entities.voices
          }
        },
        result: [
          ...state.result,
          data.result
        ]
      }
    }
    case EDIT_VOICE: {
      const data = action.payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          voices: {
            ...state.entities.voices,
            [data.result]: {
              ...data.entities.voices[data.result]
            }
          }
        }
      }
    }
    case DELETE_VOICE: {
      const id = action.payload.id;

      const entities = {
        ...state.entities
      };
      delete entities.voices[id];

      const result = state.result.filter((voiceId) => {
        return voiceId !== id
      });

      return {
        entities: entities,
        result: result
      }
    }
    default:
      return state
  }
}

const reducer = combineReducers({
  data
});

export default reducer