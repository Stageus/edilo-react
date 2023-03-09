import React from "react";

import useFetch from "../../hooks/useFetch";
import PostList from "../elements/PostList";

const Clipping = () => {
    return (
        <PostList url={'/post/scrap/all'}/>  
    )
}

export default Clipping