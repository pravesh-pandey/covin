
const BaseUrl = "http://localhost:5000";

async function fetchBucket (bucketId) {
	const response = await fetch(`${BaseUrl}/bucket/${bucketId}`);
	if (!response.ok) throw new Error(response.statusText);
	
	const data = await response.json();
	return data;
};

export default fetchBucket;