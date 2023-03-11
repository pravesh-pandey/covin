import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const BaseUrl = "http://localhost:5000";

const BucketList = ({setDestbucketId}) => {
  const [buckets, setBuckets] = useState([]);

  useEffect(() => {
    const fetchBuckets = async () => {
      const response = await fetch(`${BaseUrl}/buckets`);
      const data = await response.json();
      setBuckets(data);
    };
    fetchBuckets();
  }, []);

  const handleBucketSelect = (bucket) => {
    setDestbucketId(bucket._id);
  };

  return (
    <div>
      <h2>Select a bucket to move to</h2>
      <select onChange={handleBucketSelect}>
        <option value="">Select a bucket</option>
        {buckets.map((bucket) => (
          <option key={bucket._id} value={bucket._id}>
            {bucket.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BucketList;
