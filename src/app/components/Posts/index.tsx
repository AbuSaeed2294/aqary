"use client";

import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Loader from "./common/Loader";
import { getPosts } from "@/app/lib/api";

type postTypes = {
  userId: string;
  id: string | number;
  title: string;
  body: string;
};

const Posts = () => {
  const [posts, setPosts] = useState<postTypes[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getPostsData = async () => {
    setIsLoading(true)
    try {
      const { data } = await getPosts();
      setPosts(data);
      setIsLoading(false)
    } catch (error) {
        setIsLoading(false)
      setIsError(true);
    } finally {
        setIsLoading(false)
        setIsError(false)
    }
  };

  useEffect(() => {
    getPostsData();
  }, []);

  return (
    <section>

        {/* Loader */}
        {isLoading && <Loader />}

        {/* Error */}
        {isError && <p>error
        </p>}

        {/* map posts data */}
      {posts?.map(({ id, title, body }: postTypes) => {
        return (
          <Link key={id} href={`/post/${id}`}>
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                margin: "20px",
                border: "1px solid grey",
                borderRadius: "10px",
                maxWidth: '100%',
              }}
            >
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        sx={{
                          display: "block",
                          fontWeight: "bold",
                          marginBlock: "2px",
                        }}
                        component="span"
                        variant="h5"
                        color="text.primary"
                      >
                        {title}
                      </Typography>
                      <Typography
                        sx={{ display: "block" }}
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
          </Link>
        );
      })}
    </section>
  );
};

export default Posts;
