import {useLocation} from 'react-router-dom';
import {useMemo} from 'react';
import 'url-search-params-polyfill';

export function useQuery() {
	const search = useLocation()?.search;
	const query = useMemo(() => {
		const searchParams = (new URLSearchParams(search) as Object) as string[];
		const temp: {[key: string]: string} = {};
		searchParams.forEach((value: string, key: number) => {
			temp[key] = value;
		});
		return temp;
	}, [search]);

	return query;
}
