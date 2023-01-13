import { useEffect, useState } from "react";

const ArticleTeaser = () => {

  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<any>("");

  const getTeaser = () => {
    let api_url = "https://dog.ceo/api/breeds/image/random";

    fetch(api_url)
      .then((res) => {
        // Unfortunately, fetch doesn't send (404 error) into the cache itself
        // You have to send it, as I have done below
        if (res.status >= 400) {
          throw new Error("Server responds with error!");
        }
        return res.json();
      })
      .then(
        (data) => {
          setIsLoading(false);
          setImage(data.message);
        },
        (err) => {
          setErr(err);
          setIsLoading(false);
        }
      );
  };

  useEffect(() => {
    setIsLoading(true);
    getTeaser();
  }, []);

  if (err) {
    return <div> {err.message} </div>;
  }
  if (isLoading) {
    return <div> Loading... </div>;
  }

  return (
    <li className="article-teaser">
      <img src={image} alt="dog" />
    </li>
  );
};

export default ArticleTeaser;
