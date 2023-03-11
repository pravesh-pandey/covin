import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Bucket from "./Bucket";
import "./css/Home.css";

const BaseUrl = "http://localhost:5000";

const Home = () => {
  const [buckets, setBuckets] = useState([]);
  const [bucketName, setBucketName] = useState("");

  async function newBucket() {
    const data = { name: bucketName };
    const requestBody = JSON.stringify(data);
    const contentLength = requestBody.length;

    const response = await fetch(`${BaseUrl}/newbucket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": contentLength.toString(),
      },
      body: JSON.stringify({ name: bucketName }),
    }).catch((err) => console.log(err));

    const bucket = await response.json();
    setBuckets((buckets) => [...buckets, bucket]);
    console.log("new bucket created");
    console.log(bucket);
  }

  useEffect(() => {
    async function fetchBuckets() {
      const response = await fetch(`${BaseUrl}/buckets`, {
        method: "GET",
      });
      const buckets = await response.json();
      setBuckets(buckets);
    }
    fetchBuckets();
    console.log("fetching buckets");
    console.log(buckets);
  }, []);

  return (
    <div className="container">
      <h1>Bucket Card Home</h1>
      <div className="bucket-list">
        {buckets.map((bucket) => (
          <div key={bucket._id} className="bucket">
            <Link to={`/Bucket/${bucket._id}`}
			className="bucket-link"
			>{bucket.name}</Link>
          </div>
        ))}
      </div>
      <div className="form-container">
        <label htmlFor="bucketNameInput">Bucket name:</label>
        <input
          id="bucketNameInput"
		  type="text"
          value={bucketName}
          onChange={(e) => setBucketName(e.target.value)}
        />
        <button onClick={newBucket}>Create a bucket</button>
      </div>
    </div>
  );
};

export default Home;
