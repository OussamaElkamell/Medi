import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Spin } from 'antd';
import PostWidget from "./PostWidget";

const MemoizedPostWidget = React.memo(PostWidget);

const PostsWidget = ({ userId, token ,isProfile  }) => {
 
  const [isLoading, setIsLoading] = useState(false);
  const [postsState, setPostsState] = useState({});
  const apiUrl = process.env.REACT_APP_API_URL;
  
  const getPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/posts/${userId}/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setPostsState((prevPosts) => {
          const newPosts = { ...prevPosts };
          data.forEach(post => {
            newPosts[post._id] = post;
          });
          return newPosts;
        });
      } else {
        console.error('Failed to fetch posts:', await response.json());
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  }, [token, userId]);
  const getMyPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/posts/${userId}/Myposts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setPostsState((prevPosts) => {
          const newPosts = { ...prevPosts };
          data.forEach(post => {
            newPosts[post._id] = post;
          });
          return newPosts;
        });
      } else {
        console.error('Failed to fetch posts:', await response.json());
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  }, [token, userId]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight-70 && !isLoading &&!isProfile) {
        getPosts();
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight-70 && !isLoading &&isProfile) {
        getMyPosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [getPosts, getMyPosts, isLoading]);

  useEffect(() => {
    if (!isProfile){
    getPosts();
  }
  }, [userId, isProfile, getPosts]);

  const renderPosts = () => {
    const postsArray = Object.values(postsState);
    if (postsArray.length === 0) {
      return <div>No posts available</div>;
    }

    return postsArray.map(
      ({
        _id,
        userId,
        firstName,
        lastName,
        createdAt,
        title,
        description,
        picturePath,
        userPicturePath,
        likes,
        comments,
      }) => (
        <MemoizedPostWidget
          key={_id}
          postId={_id}
          postUserId={userId}
          name={`${firstName} ${lastName}`}
          createdAt={createdAt}
          title={title}
          description={description}
          picturePath={picturePath}
          userPicturePath={userPicturePath}
          likes={likes}
          comments={comments}
        />
      )
    );
  };

  return (
    <>
      {renderPosts()}
      {isLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
          <Spin />
        </div>
      )}
    </>
  );
};

export default PostsWidget;
