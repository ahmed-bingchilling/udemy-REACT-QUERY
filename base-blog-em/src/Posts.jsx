import { useEffect, useState } from "react";

//Hook used when we want to fetch data from the server
import { useQuery, useQueryClient } from "react-query";
//

import { PostDetail } from "./PostDetail";
const maxPostPage = 10;



export function Posts() {
  const [currentPage, setCurrentPages] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  
const queryClient= useQueryClient()

useEffect(()=>{
  if(currentPage<maxPostPage){
  const nextPage= currentPage+1
  queryClient.prefetchQuery(["posts", nextPage],() =>
  fetchPosts(nextPage))
}
},[currentPage, queryClient])

  const fetchPosts= async (pageNum) => {
    await pause(500);
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
    );
     
    return response.json();
    }
    const pause= (duration)=>{
      return new Promise((resolve)=>{
        setTimeout(resolve, duration)
      })
    }

  // replace with useQuery

  const {data, error, isError, isLoading} = useQuery(["posts",currentPage ],() => fetchPosts(currentPage), { staleTime: 2000, keepPreviousData:true}) ;
  if (isLoading) return <h3>Loading...</h3>
  if(isError)return <h3>Something Went Wrong {error.toString()}</h3>


  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled={currentPage <=1 } onClick={() => {
          setCurrentPages((currentPage)=> currentPage-=1)
          setSelectedPost(null)
          }}>
          Previous page
        </button>
        <span>Page {currentPage }</span>
        <button disabled={currentPage >= maxPostPage} onClick={() => {
          setCurrentPages((currentPage)=> currentPage +=1)
          setSelectedPost(null)
          }}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
