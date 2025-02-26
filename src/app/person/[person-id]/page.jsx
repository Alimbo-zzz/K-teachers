import { cache } from 'react';
import Render from './index';

export const getPerson = cache(async (params) => {
	const res = await fetch(`https://апи.учителягерои.рф/persons/read?accepted=true&id=${params['person-id']}`, { next: { revalidate: 3000 } })
	const person = await res.json();
	return person;
});


export async function generateMetadata({ params, searchParams }, parent) {
	const res = await getPerson(params);
	if(!res.status) return console.log(res.details)
	const person = res.details.data[0];

  return {
    title: `${person.lastname} ${person.firstname} ${person.patronymic} | Учителя Фронтовики Казани`,
    openGraph: {
      description: `Карточка учителя фронтовика Казани. ${person.lastname} ${person.firstname} ${person.patronymic}`,
      url: `https://учителягерои.рф/list/person/${person._id}`,
    },
		alternates: {
			canonical: `https://учителягерои.рф/list/person/${person._id}`,
		},
  }
}


export default async (props) => {
	const person = await getPerson(props.params);


	return (<>
		<Render person={person} {...props} />
	</>);
}
