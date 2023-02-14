import { collection, query, where, getDocs} from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import {db} from './firebase-config';
import { getAuth } from 'firebase/auth';
import React from 'react';
import {Link} from 'react-router-dom';
import { useEffect , useRef, useState } from 'react';



const HomePage = (props) => {

    const [posts, setPosts] = useState([])
    const [isPostClicked, setIsPostClicked] = useState(false)
    const [clickedDescription, setClickedDescription] = useState('')

    // Function to make  a post box
    const makePost = (description) => {
        return <div className='entry'>{description}</div>
    }
  // function to get all of the posts
  const getPosts = () => {
    const auth = getAuth();
    const user = auth.currentUser
    console.log(2)
    if(user != null) {
        console.log(3)
        const uid = user.uid
        const q = query(collection(db, "UserPosts"), where("Author", "==", uid))
        const tempPostData = []
        getDocs(q).then((postData) => {
            postData.forEach((doc) => {
                console.log(4)
                tempPostData.push(doc.data())
            })
            console.log(tempPostData)
            setPosts(tempPostData)
        })
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

    return(<>
        {isPostClicked ? 
        <>
            <div>{clickedDescription}</div>
            <button onClick={() => {setIsPostClicked(false)}}>Return</button>
        </>
        :
        <>
        <div className="titleRow"><h1>My Entries</h1><Link className="newEntryLink" to="/newEntry">New Entry</Link></div>
        <div className="filterRow">
            <h3 className="filterText">Filter</h3>
            <select defaultValue={'title'}>
                <option value='title' name="" disabled>Month</option>
                <option name="jan">Jan</option>
                <option name="feb">Feb</option>
                <option name="march">March</option>
                <option name="april">April</option>
                <option name="may">May</option>
                <option name="june">June</option>
                <option name="july">July</option>
                <option name="aug">Aug</option>
                <option name="sept">Sept</option>
                <option name="oct">Oct</option>
                <option name="nov">Nov</option>
                <option name="dec">Dec</option>
            </select>
            <select defaultValue={"title"}>
                <option value="title" name="Year" disabled>Year</option>
                <option name="2020">2020</option>
                <option name="2021">2021</option>
                <option name="2022">2022</option>
            </select>
        </div>
        <div className="entryGrid" id='entryGrid'>
        {posts.map((data) => (
            <BlogEntry description={data} setFocus={setIsPostClicked} setDescription={setClickedDescription} />
        ))}
    </div>
    </>}
        </>
    )}

    const BlogEntry = ({description, setFocus, setDescription}) => {
        console.log("Entry!")
        const blogDescription = description["Description"]
        return (
            <div className='entry' onClick={() => {setFocus(true); setDescription(blogDescription)}}>{blogDescription}</div>
        );
    }

    export default HomePage