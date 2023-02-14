import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import * as draftToHtml from 'draftjs-to-html'
import {Link} from 'react-router-dom'
import * as DOMPurify from 'dompurify'
import { getAuth } from "firebase/auth";
import {db} from './firebase-config'
import { collection, getDocs, addDoc} from "firebase/firestore";

const NewEntry = (props => {
  const [userHTMLState, setUserHTMLState] = useState({__html:'<p>100</p>'});

    const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    console.log(userHTMLState.__html);
  }, [editorState, userHTMLState]);

  const submitButton = () => {
    setUserHTMLState({__html: DOMPurify.sanitize(draftToHtml(convertToRaw(editorState.getCurrentContent())))})
    const addPost = async () => {
      const auth = getAuth();
      const user = auth.currentUser
      const uid = user.uid
      const message = editorState.getCurrentContent().getPlainText('\u00001')
      console.log(message)
      const userPostsRef = collection(db, 'UserPosts');
      await addDoc(userPostsRef, {Author : uid, Description : message, Title : "Second Post"})
    }
    addPost();
  }

  return (
    <div className="newPostPage">
        <div className="newPostTitleRow"><h2>New Post</h2></div>
        <div className="newPostBox">
            <Editor editorClassName="editor"
            toolbarClassName="toolbar"
            wrapperClassName="editorBox"
            editorState={editorState}
            onEditorStateChange={setEditorState}
            />
            <button onClick={submitButton} className="newPostButton">Post</button>
            <Link to="/" className="cancelButton">Cancel</Link>
        </div>
        <div dangerouslySetInnerHTML={userHTMLState}></div>
    </div>
  );
})

export default NewEntry