'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { getCommentsByPostId, getPostById } from '@/app/lib/api';
import Loader from '@/app/components/Posts/common/Loader';

type paramIdType = {
    id: string
}

type postTypes = {
    userId: string;
    id: string | number;
    title: string;
    body: string;
  };

  type commentTypes = {
    id: string;
    postId: string;
    body: string;
    email: string;
    name: string;
  };

const PostDetails = () => {
    const [postDetails, setPostDetails] = useState<postTypes>()
    const [postComments, setPostComments] = useState<commentTypes[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)

    const {id} = useParams<paramIdType>()

    const getPostAndComments = async () => {
       try {
        setIsLoading(true)
        const post = await getPostById(id)
        const comments = await getCommentsByPostId(id)

        setPostDetails(post.data)
        setPostComments(comments.data)
       } catch (error) {
        setIsError(true)
        setIsLoading(false)
       } finally {
        setIsLoading(false)
        setIsError(false)
       }

    }

    useEffect(() => {
        getPostAndComments()
    }, [id])
    

  return (
    <section>
        {/* Loader */}
        {isLoading && <Loader />}

        {/* Error */}
        {isError && <p>Error while getting data</p>}

        {/* post title */}
        <div style={{backgroundColor: "white", border: "1px solid gray", borderRadius: "10px", color: 'black', padding: "10px"}}>
            <p style={{fontWeight: 'bold', fontSize: "1.5rem"}}>{postDetails?.title}</p>
            <p>{postDetails?.body}</p>
           

        {/* map comments data */}
        {postComments?.map(({name, body, id, email}:commentTypes) => {
            return <List key={id} sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {/* dummy user image */}
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="h6"
                      color="text.primary"
                    >
                      {name}
                    </Typography>
                    <Typography
                      sx={{ display: 'block' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {body}
                    </Typography>
                    
                  </React.Fragment>
                }
              />
            </ListItem>
            </List>
        })}
         </div>
      
    </section>
  )
}

export default PostDetails