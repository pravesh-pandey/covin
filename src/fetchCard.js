import dotenv from 'dotenv';
dotenv.config();
const BaseUrl = process.env.BaseUrl;
const fetchCard = async (id) => {
	const response = await fetch(`${BaseUrl}/card/${id}`);

	if (!response.ok) throw new Error(response.statusText);
	const data = await response.json();
	return data;
};

export default fetchCard;