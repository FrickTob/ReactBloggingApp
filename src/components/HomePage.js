import { collection, query, where, getDocs} from 'firebase/firestore';
import {db} from './firebase-config';
import { getAuth } from 'firebase/auth';
import React from 'react';
import {Link} from 'react-router-dom';
import { useEffect , useState } from 'react';
import BlogView from './BlogView';



const HomePage = (props) => {

    const [posts, setPosts] = useState([])
    const [isPostClicked, setIsPostClicked] = useState(false)
    const [postID, setPostID] = useState('')
    const [clickedDescription, setClickedDescription] = useState('')
    const [clickedTitle, setClickedTitle] = useState('')
    const [clickedDate, setClickedDate] = useState('')

    // Function to make  a post box
    // const makePost = (description) => {
    //     return <div className='entry'>{description}</div>
    // }
  // function to get all of the posts
  const getPosts = () => {
    const auth = getAuth();
    const user = auth.currentUser
    if(user != null) {
        const uid = user.uid
        const q = query(collection(db, "UserPosts"), where("Author", "==", uid))
        const tempPostData = []
        getDocs(q).then((postData) => {
            postData.forEach((doc) => {
                tempPostData.push([doc.id, doc.data()])
            })
            console.log(tempPostData)
            setPosts(tempPostData)
        })
    }
  }

  useEffect(() => {
    getPosts()
  }, [postID, isPostClicked])

    return(<>
        {isPostClicked ? 
            <BlogView description={clickedDescription} title={clickedTitle} setIsClicked={setIsPostClicked} postID={postID} date={clickedDate}/>
        :
        <>
        <div className="titleRow"><h1>My Entries</h1><Link className="newEntryLink" to="/newEntry">New Entry</Link></div>
        <div className="entryGrid" id='entryGrid'>
        {posts.map((data) => (
            <BlogEntry key={data[0]} postData={data} setFocus={setIsPostClicked} setDescription={setClickedDescription} setSelectedPostId={setPostID} setTitle={setClickedTitle} setDate={setClickedDate}/>
        ))}
    </div>
    </>}
        </>
    )}

    const BlogEntry = ({postData, setFocus, setDescription, setTitle, setSelectedPostId, setDate}) => {
        const blogDescription = postData[1]["Description"]
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