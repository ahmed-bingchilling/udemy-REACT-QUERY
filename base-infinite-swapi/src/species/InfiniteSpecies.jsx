import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "@tanstack/react-query";
const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query


const {data, 
  isLoading, 
  isError, 
  error, 
  hasNextPage, 
  fetchNextPage, 
  isFetching} = useInfiniteQuery(
  {
    queryKey: ["sw-species"],
    queryFn: ({pageParam = initialUrl}) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => lastPage.next || undefined
  }
)

  return <>
  {isFetching && <div className="loading">isLoading...</div>}
  {isLoading? <div className="loading">isLoading...</div>:  <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
    {data?.pages?.map(pageData=> {
      return (
        pageData?.results.map(species => {
          return <Species
          key={species.name}
          name={species.name}
          language={species.language}
            averageLifespan={species.average_lifespan}
          />

     
        })
      )
    })}
  </InfiniteScroll>}
  {isError && <div>Unexpected behaviour {error.toString()}</div>}

  </>
}
