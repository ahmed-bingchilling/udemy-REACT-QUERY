import { useMutation, useQuery, useQueryClient } from "react-query";
async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
 

  return response.json();
}
const pause= (duration) =>{
  return new Promise(resolve => setTimeout(resolve,duration) )
}


async function deletePost(postId) {
  await pause(1000)
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  await pause(1000)
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {

  // replace with useQuery


const {data, isLoading, error, isError}= useQuery(`comments.${post.id}`, ()=> fetchComments(post.id))
 
const deleteMutation= useMutation(()=> {
  deletePost(post.id)
  
})


const updatedMutation= useMutation(() => updatePost(post.id))



  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={()=> deleteMutation.mutate()}>Delete</button> 
      {deleteMutation.isLoading && <div>Deleting Now..</div>}
      {deleteMutation.isSuccess && <div>Post is Deleted</div>}
      {deleteMutation.isError && <div>Error deleting {error}</div>}
      <button onClick={() => updatedMutation.mutate()}>Update title</button>
      {updatedMutation.isLoading && <div>Updating Title...</div>}
      {updatedMutation.isError && <div>Error updating {error.toString()} </div>}
      {updatedMutation.isSuccess && <div> Update Complete</div>}
      <p>{post.body}</p>

      <h4>Comments</h4>

      {isLoading? <p>Loading Comments...</p>: <div>{data?.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}</div>}
      {isError && <p>Something Went Wrong {error.toString()}</p>}
      
    </>
  );
}
