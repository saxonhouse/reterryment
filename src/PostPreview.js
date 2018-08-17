import React from 'react'
import {Border, Truncate, Heading, Text} from 'rebass'
import {Link} from 'react-router-dom'

const PostPreview = ({post}) => (
    <Border>
      <Link to={`/${post.type}/${post.id}`}>
        <Heading>{post.title}</Heading>
      </Link>
      <Text> {post.author} </Text>
      <Truncate> {post.truncate} </Truncate>
      <p>{post.published}</p>
    </Border>
)

export default PostPreview;
