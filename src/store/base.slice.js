import { createSlice } from '@reduxjs/toolkit'



const filterLetter = (state) => {
	if(!state.activeLetterIndex && state.activeLetterIndex !== 0) return ([...state.personList]);
	let letter = state.letters[state.activeLetterIndex].toLowerCase();
	let arr = [...state.personList].filter(el => {
		let l = el.lastname.split('').shift().toLowerCase();
		return l == letter
	})
	return arr
}

const filterSearch = (arr, payload) => {
	if(!payload) return arr;
	try {
		let re = new RegExp(`${payload}`, 'i')
		return arr.filter(el => el.lastname.search(re) !== -1);
	} catch (error) {
		return arr;
	}
}


const setSearchList = (state) => {
	const arr = filterLetter(state);
	const result = filterSearch(arr, state.searchValue);
	return result;
}

const base = createSlice({
	name: 'base',
	initialState: {
		activeLetterIndex: undefined,
		contentType: 'list', // list || letters
		letters: ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Э', 'Ю','Я'],
		personList: [],
		searchList: [],
		searchValue: '',
		contentVisible: false,
		listLastScroll: 0,
	},
	reducers: {
		setListLastScroll: (state, {payload=0}) => {
			state.listLastScroll = Number(payload);
		},
		setActiveLetterIndex: (state, {payload}) => {
			state.activeLetterIndex = payload
			state.searchList = setSearchList(state)
		},
		setPersonList: (state, {payload}) => {
			state.personList = [...payload].sort((a,b) => a.lastname < b.lastname ? -1 : 1);
			state.searchList = [...setSearchList(state)].sort((a,b) => a.lastname < b.lastname ? -1 : 1)
			// window.localStorage.setItem('k-teachers-list', JSON.stringify(payload))
		},
		setSearchValue: (state, {payload=''}) => { 			
			if(payload) state.activeLetterIndex = null;
			state.searchValue = [...payload].sort((a,b) => a.lastname < b.lastname ? -1 : 1);
			state.searchList = filterSearch([...state.personList], payload).sort((a,b) => a.lastname < b.lastname ? -1 : 1)
		},
		toggleContentType: (state, {payload}) => {state.contentType = payload ? state.contentType = payload : (state.contentType == 'list') ? 'letters' : 'list'},
		setContentVisible: (state, {payload}) => {state.contentVisible = payload},
	}
})

const { actions, reducer } = base


export const {setContentVisible, setListLastScroll, setActiveLetterIndex, setPersonList, setSearchValue, toggleContentType} = actions
export default reducer
