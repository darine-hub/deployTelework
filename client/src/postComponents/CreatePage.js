import React, {  useState,useEffect } from 'react'
import QuillEditor from '../../Quill';
import {addNewPost} from '../../../redux/postsSlice'
import {getUsers} from '../../../redux/userSlice'
import { useSelector , useDispatch } from "react-redux";
import BarreNavigationHome from "../../../components/BarreNavigationHome"
import {useHistory} from 'react-router-dom'


function CreatePage() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user);
    const [content, setContent] = useState("")
    const [description, setDescription] = useState("")
    const [files, setFiles] = useState([])
    const blogs = useSelector(state => state.blogs);
    const history = useHistory()
    useEffect(() => {
        dispatch(getUsers());
    
        if (!user.isAuth) {
          history.push("/login");
        }
        else if(user.userInfo&&(user.userInfo.role!=="Admin")){
            history.push("/");
        }
      }, [user.isAuth]);

    const onEditorChange = (value) => {
        setContent(value)
        console.log(content)
    }

    const onFilesChange = (files) => {
        setFiles(files)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        
        if (user.userInfo && !user.isAuth) {
            
            return alert('Please Log in first')
        }
        else if(!content){alert("you must write something first!")}
        else if(!description){alert("please add a description!")}
        else{const variables = {
            content: content,
            userID: user.userInfo._id,
            description:description
 
        }

        dispatch(addNewPost(variables))
        if (!((!blogs.loading)&&blogs.postErrors)){alert("post created!")}
        else if(blogs.postErrors){alert("error occured!")}}
        setContent("");

    }

                   


    return (
        <body>
        <div className="main-container" >
            <BarreNavigationHome/>
            <div className="container middle-container block" style={{ width: '65%',padding:"20px 70px" }}>
            <div style={{ textAlign: 'center',padding:"0 20px 20px 20px" }} className="titular">
                <h1 > Editor</h1>
            </div>
            
            <input placeholder="write description..." style={{backgroundColor:"white",width:"100%"}} onChange={e=>setDescription(e.target.value)}/>
            <QuillEditor
                placeholder={"Start Posting Something"}
                onEditorChange={onEditorChange}
                onFilesChange={onFilesChange}
            />

            <form onSubmit={onSubmit}>
                <div style={{ textAlign: 'center', margin: '2rem', }}>
                    <button
                        size="large"
                        htmlType="submit"
                        className=""
                        onSubmit={onSubmit}
                    >
                        Submit
                </button>
                </div>
            </form>
            </div>
        </div>
        </body>
    )
}

export default CreatePage