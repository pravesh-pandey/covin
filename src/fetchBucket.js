async function fetchBucket (bucketId) {
	const BaseUrl = "http://localhost:5000";
	const response = await fetch(`/bucket/${bucketId}`);
	if (!response.ok) throw new Error(response.statusText);
	
	const data = await response.json();
	return data;
};

export default fetchBucket;