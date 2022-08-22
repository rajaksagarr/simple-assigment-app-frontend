import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useRef, useState } from 'react'
import { PagedQueryInterface } from '../config/urls.config';
import { PagedResponse } from './interfaces/pagedResponse.interface';
import { InView } from 'react-intersection-observer';
import Loader from './loader.component';

export type PageComponentParams = {
  refresh: () => void;
  firstElementId: number;
}
export interface PaginatedComponentProps<T> {
    children: (data: T[], parmas: PageComponentParams) => JSX.Element | JSX.Element[];
    apiFunction: (value: PagedQueryInterface) => string;
    uniqueKey: string;
    limit: number;
}

export default function PaginatedComponent<T extends { id: number }>(props: PaginatedComponentProps<T>) {
    const { apiFunction, uniqueKey, limit } = props;

    const [page, setPage] = useState<number>(1);
    const [refreshKey, setRefreshKey] = useState<number>(0);

    const firstElementId = useRef<number>(0); // use for moving focus of browser scroll
    const isInView = useRef<boolean>(false);

    const pagedData = useRef<PagedResponse<T>>({
      data: [],
      isNextAvaible: true,
      ok: true,
    });

    const fetchQuery = async () => {
      const responseRaw =  await fetch(apiFunction({ page, limit}));
      const response = await responseRaw.json();
      if (response.ok) {
        if (response.data && response.data.length) {
          firstElementId.current =  response.data[0].id;
        } else {
          firstElementId.current = 0;
        }
        pagedData.current.isNextAvaible = response.isNextAvaible;
        pagedData.current.data = [...pagedData.current.data, ...response.data];
        pagedData.current = {...pagedData.current};
        return Promise.resolve(pagedData.current);
      }
      return Promise.reject(data);
    }

  const { isLoading, error, data } = useQuery<unknown, unknown, PagedResponse<T>>([uniqueKey, page, refreshKey], fetchQuery, {
    keepPreviousData: true,
    onSuccess: (data) => {
      setTimeout(() => {  // check view is still visible update view 
        if (isInView.current && data && data.isNextAvaible) {
          setPage(page + 1);
        }
      }, 100);
    },
  });

  const retrigerPageApi = useCallback((InView: boolean) => {
      isInView.current = InView;
      if (!isLoading && InView && data &&  data.isNextAvaible) {
        setPage(page + 1);
      }
  }, [isLoading, page, data]);

  const refresh =  useCallback(
    () => {
      pagedData.current = {
        data: [],
        isNextAvaible: true,
        ok: true,
      };
      setPage(1);
      setRefreshKey(refreshKey+1);
    },
    [refreshKey],
  );
  
  return (
    <div className='d-flex flex-column w-100'>
      {props.children(data?.data || [], {firstElementId: firstElementId.current, refresh})}
      <InView onChange={retrigerPageApi} threshold={0}>
        <div className='w-100 d-flex justify-content-center'>
          {data && data.isNextAvaible && <Loader />}
        </div>
      </InView>
    </div>
  )
}
