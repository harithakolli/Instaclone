import {useEffect, useState} from "react"
import Card from "./Card";
import Header from "./Header";

import axios from "axios";

const PostView = ()=> {
    const [posts, setPosts] = useState([]);
    useEffect(()=> {
        // fetch("http://localhost:5000/").then((res)=>res.json()).then((data)=> {
            
        // setPosts(data.reverse());
        // }).catch((err)=> {
        //     if(err) {
        //         console.log(err)
        //     }
        // })
    
        // fetch("https://my-instaclone-server.herokuapp.com/").then((res)=>res.json()).then((data)=> {
            
        // setPosts(data.reverse());
        // }).catch((err)=> {
        //     if(err) {
        //         console.log(err)
        //     }
        // })

        axios.get("https://my-instaclone-server.herokuapp.com/")
        .then((res) => {
            setPosts(res.data.reverse())
        })

        // const getData = async () => {
        //     const response = await axios.get('http://localhost:5000/');

        //     // const response = await axios.get("https://instaclone-chavva-api.herokuapp.com/post");
        //     // console.log(data)
        //     response.data.reverse()

        //     setPosts(response.data);
        //     // console.log(response.data)
        // };
        // getData();
    }, []);
    return (
<div>
<Header/>
        <div className="post-container">
            {posts.map((post, i)=> {
                return (    
                    <Card post={post} key={i}/>
                )
            })}
        </div>
</div>
        
    )
}
export default PostView;