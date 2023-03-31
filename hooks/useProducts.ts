import useSWR, { SWRConfiguration } from 'swr';
import { IProduct } from './../interfaces';

// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())

export const useProducts = ( url: string, config: SWRConfiguration = {} ) => {

    
    const { data, error, isLoading } = useSWR(`/api${ url }`, config);
    

    return {
        data,
        isLoading,
        error
    }
}