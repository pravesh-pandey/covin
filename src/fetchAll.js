
async function fetchAll() {
	console.log("fetchAll.js: fetchAll() called");
	const BaseUrl = "http://localhost:5000";
	const response = await fetch(`${BaseUrl}/buckets`);

	if (!response.ok) throw new Error(response.statusText);
	const data = await response.json();
	return data;
};

export default fetchAll;