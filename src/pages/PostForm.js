import { useEffect, useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePosts } from "../context/postContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const PostForm = () => {
  const { createPost, getPost, upDatePost } = usePosts();
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: null,
  });
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    (async () => {
      if (params.id) {
        const res = await getPost(params.id);
        setPost(res);
      }
    })();
  });

  /*   useEffect(() => {
    const obtenerpost = async () => {
      const res = await getPost(params.id);
      console.log(res);
      setPost(
        res
      );
    };
    obtenerpost()
  }, []);  */

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-zinc-800 shadow-md p-10 shadow-black">
        <header className="flex justify-between items-center py-4 text-white">
          <h3 className="text-xl">New post</h3>
          <Link to="/" className="text-gray-400 text-sm hover:text-gray-300">
            Go Back
          </Link>
        </header>

        <Formik
          initialValues={{
            post,
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("Title es Required"),
            description: Yup.string().required("description es Required"),
          })}
          onSubmit={async (values, actions) => {
            if (params.id) {
              await upDatePost(params.id, values);
            } else {
              await createPost(values);
            }
            actions.setSubmitting(false);
            navigate("/");
          }}
          enableReinitialize
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <label
                htmlFor="title"
                className="text-sm block font-bold text-gray-400"
              >
                Title
              </label>

              <Field
                className="px-3 mb-2 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                name="title"
                type="text"
                id="title"
                placeholder="title"
                defaultValue={post.title}
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="title"
              />
              <label
                htmlFor="description"
                className="text-sm block font-bold text-gray-400"
              >
                Description
              </label>
              <Field
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-2"
                rows={3}
                component="textarea"
                name="description"
                placeholder="description"
                defaultValue={post.description}
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="description"
              />

              <label
                htmlFor="description"
                className="text-sm block font-bold text-gray-400"
              >
                Sube archivo
              </label>

              <input
                type="file"
                name="image"
                className="px-3 py-2 rounded focus:outline-none mr-3 bg-gray-600"
                onChange={(e) => setFieldValue("image", e.target.files[0])}
              />

              <button
                type="submit"
                className="bg-indigo-600 px-4 hover:bg-indigo-500 py-2 rounded mt-2 text-white focus:outline-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                ) : (
                  "save"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
