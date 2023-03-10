import { doc, deleteDoc } from "firebase/firestore"
import { db } from "./firebase-config"
import draftToHtml from "draftjs-to-html"
import * as DOMPurify from 'dompurify'

const BlogView = ({description, title, setIsClicked, postID, date}) => {

    const deletePost = () => {
        console.log(postID)
        deleteDoc(doc(db, "UserPosts/" + postID))
        setIsClicked(false)
      }

    console.log(description)
    return(<div className="showBlogBox">
            <button className='blogDeleteButton' onClick={deletePost}>Delete Post</button>
            <button className='blogCloseButton' onClick={() => {setIsClicked(false)}}>Back</button>
            <div className="selectedBlogTitle">{title}</div>
            <div className="selectedBlogDate">{date}</div>
            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(draftToHtml(JSON.parse(description)))}}></div>
    </div>)

}

export default BlogView