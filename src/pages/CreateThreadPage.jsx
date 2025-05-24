import React from "react";
import { useDispatch } from "react-redux";
import ThreadInput from "../components/Thread/ThreadInput";
import { asyncCreateThread } from "../states/threads/action";
import { useNavigate } from "react-router-dom";

function CreateThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleThreadSubmit({ title, category, body }) {
    if (!title.trim()) {
      alert("Title cannot be empty");
      return false;
    }

    if (!category.trim()) {
      alert("Category cannot be empty");
      return false;
    }

    if (!body.trim()) {
      alert("Content cannot be empty");
      return false;
    }

    dispatch(asyncCreateThread({ title, body, category }));
    navigate("/");
  }

  return (
    <section className="create-page">
      <div className="create-page-title">Create New Thread</div>
      <ThreadInput handleThreadSubmit={handleThreadSubmit} />
    </section>
  );
}

export default CreateThreadPage;
