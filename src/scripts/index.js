

export const getImage = (id, name) => `https://статика.учителягерои.рф/persons/${id}/${name}`;
export const defaultPersonSrc = 'https://статика.учителягерои.рф/persons/';


export function chunkArray(array, chunk) {
  const newArray = [];
  for (let i = 0; i < array.length; i += chunk) {
    newArray.push(array.slice(i, i + chunk));
  }
  return newArray;
}


export function arrayRows(arr, num=2){
	let result = [];
	for (let i = 0; i < num; i++) {	result.push([]) }
	let arrOld = [...arr];
	let activeI = 0;
	while (arrOld.length){
		let item = arrOld.shift();
		result[activeI].push(item)
		activeI + 1 < num ? activeI++ : (activeI = 0)
	}
	return result
}