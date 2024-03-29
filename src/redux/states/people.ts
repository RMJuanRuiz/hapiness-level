import { Person } from '@/models';
import { LocalStorageTypes } from '@/models/localstorage';
import { getLocalStorage, setLocalStorage } from '@/utils';
import { createSlice } from '@reduxjs/toolkit';

const initialState: Person[] = [];

export const peopleSlice = createSlice({
  name: 'people',
  initialState: getLocalStorage(LocalStorageTypes.PEOPLE)
    ? JSON.parse(getLocalStorage(LocalStorageTypes.PEOPLE) as string)
    : initialState,
  reducers: {
    addPeople: (state, action) => {
      setLocalStorage(LocalStorageTypes.PEOPLE, action.payload);
      return action.payload;
    },
  },
});

export const { addPeople } = peopleSlice.actions;

export default peopleSlice.reducer;
