import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { PostForm, Container } from "../components";
import appwriteService from "../appwrite/config";

function EditPost() {
  const [post, setPost] = useState(null);
  // user post pe click krega , url change hoga , abbb url se value nikalne ke loye , we use params
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        setPost(post);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
