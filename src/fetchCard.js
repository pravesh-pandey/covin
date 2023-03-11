const fetchCard = async (id) => {
	const BaseUrl = "http://localhost:5000";
	const response = await fetch(`/card/${id}`);

	if (!response.ok) throw new Error(response.statusText);
	const data = await response.json();
	return data;
};

export default fetchCard;