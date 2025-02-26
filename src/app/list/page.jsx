import { cache } from 'react';
import Render from './index'


export const metadata = {
  title: 'Список учителей | Учителя Фронтовики Казани',
}



export default async (props) => {
	const res = await fetch(`https://апи.учителягерои.рф/persons/read?accepted=true`, { next: { revalidate: 3000 } })
	const data = await res.json();

	const renderOps = {
		data,
	}
	
	return (<>
		<Render {...renderOps} />
	</>);
}
