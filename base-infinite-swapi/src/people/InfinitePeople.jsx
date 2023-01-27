import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};


export function InfinitePeople() {
const {data, fetchNextPage, hasNextPage,isLoading, isError,isFetching, error}= useInfiniteQuery({
queryKey:["sw-people"],
queryFn:({pageParam = initialUrl}) => fetchUrl(pageParam),
getNextPageParam: (lastPage) => lastPage.next || undefined,
})

  // TODO: get data for InfiniteScroll via React Query
  return <>

  {isFetching && <div className="loading"><h1>Loading...</h1></div>}

  {isLoading? <div className="loading"><h1>Loading...</h1></div>: <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
  {data?.pages?.map(pageData => {
    return pageData.results.map(person => {
      return(
      <Person 
      key={person.name} 
      name={person.name} 
      hairColor={person.hair_color} 
      eyeColor={person.eye_color}/>
     
   ) })
  })}
</InfiniteScroll>}

{isError && <div>Unexpected behaviour {error.toString()}</div>}
</>

}
