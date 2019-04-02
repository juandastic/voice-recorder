import { schema } from 'normalizr';

export const voice = new schema.Entity('voices', {}, {
    idAttribute: '_id'
});

export const voicesListSchema = new schema.Array(voice);

