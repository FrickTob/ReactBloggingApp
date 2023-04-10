import React, {useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {useNavigate} from 'react-router-dom'
import { getAuth } from "firebase/auth";
import {db} from './firebase-config'
import { collection, addDoc} from "firebase/firestore";

const NewEntry = (props => {
  const navigate = useNavigate()
  const [postTitle, setPostTitle] = useState('')

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );


  const submitButton = () => {
    const addPost = async () => {
      const auth = getAuth();
      const user = auth.currentUser
      const uid = user.uid
      const message = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      const date = new Date()
      const dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()
      console.log(convertToRaw(editorState.getCurrentContent()))
      console.log(message)
      console.log(postTitle)
      const userPostsRef = collection(db, 'UserPosts');
      await addDoc(userPostsRef, {Author : uid, Description : message, Title : postTitle, Date : dateString}).then(navigate('/'))
    }
    addPost();
  }

  return (
    <div className="newPostPage">
        <div className="newPostTitleRow"><h2>New Post</h2></div>
        <div className="newPostBox">
            <label className="postTitleText" htmlFor="title">Post Title</label>
            <input className="postTitleInput" onChange={(event) => {setPostTitle(event.target.value)}} id="titleInput" type={"text"} />
            <label className="postDescriptionText" htmlFor="editor">Post Description</label>
            <Editor editorClassName="editor"
            toolbarClassName="toolbar"
            wrapperClassName="editorBox"
            editorState={editorState}
            onEditorStateChange={setEditorState}
            />
            <button onClick={submitButton} className="newPostButton">Post</button>
            <button onClick={() => {navigate('/')}} className="cancelButton">Cancel</button>
        </div>
    </div>
  );
})

export default NewEntry