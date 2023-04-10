import { collection, query, where, getDocs} from 'firebase/firestore';
import {db} from './firebase-config';
import { getAuth } from 'firebase/auth';
import React from 'react';
import {Link} from 'react-router-dom';
import { useEffect , useState } from 'react';
import BlogView from './BlogView';



const HomePage = (props) => {

    const [numDisplayed, setNumDisplayed] = useState(5)
    const [numPosts, setNumPosts] = useState(9)
    const [posts, setPosts] = useState(dummyPosts)
    const [isPostClicked, setIsPostClicked] = useState(false)
    const [postID, setPostID] = useState('')
    const [clickedDescription, setClickedDescription] = useState('')
    const [clickedTitle, setClickedTitle] = useState('')
    const [clickedDate, setClickedDate] = useState('')

  const getPosts = () => {


        }

  const showMorePosts = () => {
    setNumDisplayed(numDisplayed + 16 > numPosts ? numPosts : numDisplayed + 16)
  }

  useEffect(() => {
    // getPosts()
  })

    return(<>
        {isPostClicked ? 
            <BlogView description={clickedDescription} title={clickedTitle} setIsClicked={setIsPostClicked} postID={postID} date={clickedDate}/>
        :
        <>
          <Link className="newEntryLink" to="/newEntry">New Entry</Link>
          <div className="entryGrid" id='entryGrid'>
              {posts.slice(0, numDisplayed).map(data => (
                  <BlogEntry key={data[0]} postData={data} setFocus={setIsPostClicked} setDescription={setClickedDescription} setSelectedPostId={setPostID} setTitle={setClickedTitle} setDate={setClickedDate}/>
              ))}
          </div>
          {numPosts > numDisplayed ? 
              <div className='morePostsButtonWrapper'><button className='morePostsButton' onClick={showMorePosts}>Show More Posts</button></div>
              :
              <></>
              }
        </>}
        </>
    )}

    const BlogEntry = ({postData, setFocus, setDescription, setTitle, setSelectedPostId, setDate}) => {
        const blogDescription = postData[1].Description
        console.log(blogDescription)
        const blogTitle = postData[1]["Title"]
        const dateString = postData[1]["Date"]
        const postID = postData[0]
        return (
            <div className='entry' onClick={() => {setFocus(true); setDescription(blogDescription); setSelectedPostId(postID); setTitle(blogTitle); setDate(dateString)}}>
                <div>{blogTitle}</div>
                <div>{dateString}</div>
            </div>
        );
    }

    export default HomePage