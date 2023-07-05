import React from "react";
import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section
      className="
      w-full max-w-full flex-start flex-col
    "
    >
      <h1
        className="
        head_text text-left
      "
      >
        <span className="blue_gradient">{type} </span>
        Post
      </h1>

      <p className="desc text-left max-w-md">
        {type} and share prompts with the community.
      </p>
      <form
        onSubmit={handleSubmit}
        className="
          mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism 
         "
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
        <textarea
          className="form_textarea"
          value={post.prompt}
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          placeholder="Write your prompt here..."
          required
        />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag <span className="font-normal">
              (#product, #service, #brand, #idea)
            </span>
          </span>
        <input
          className="form_input"
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
          placeholder="#Tag"
          required
        />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link className="
            text-gray-500 text-sm 
          " href='/'>
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="
              px-5 py-1.5 text-sm bg-primary-orange text-white rounded-full
            "
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
