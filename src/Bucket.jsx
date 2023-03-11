import Card from "./Card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BucketList from "./BucketList";
import "./css/Bucket.css";
require('dotenv').config();
const BaseUrl = process.env.BaseUrl;

const Bucket = () => {
	const { id } = useParams();
	const [bucket, setBucket] = useState({});
	const [destbucketId, setDestbucketId] = useState("");
	const [selectedCards, setSelectedCards] = useState([]);
	const [cardDetails, setcardDetails] = useState({
		name: "",
		link: "",
	});
	function isValidUrl(url) {
		const regex = /^(ftp|http|https):\/\/[^ "]+$/;
		return regex.test(url);
	  }
	const handleDelete = (cardId) => {
	setBucket((bucket) => ({
		...bucket,
		cards: bucket.cards.filter((card) => card._id !== cardId),
	}));
	};
	async function newCard(id) {
		if (!isValidUrl(cardDetails.link)) {
			alert('Invalid URL');
			return;
		  }
		const data = {
			bucketId: id,
			name: cardDetails.name,
			link: cardDetails.link,
		};
		const requestBody = JSON.stringify(data);
		const contentLength = requestBody.length;
		const response = await fetch(`${BaseUrl}/newCard`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Content-Length": contentLength.toString(),
			},
			body: requestBody,
		}).catch((err) => console.log(err));
		const card = await response.json();
		setBucket((bucket) => {
			return { ...bucket, cards: [...bucket.cards, card] };
		});
		console.log("new card created");
		console.log(card);
	}
	const handleCardSelect = (cardId) => {
		const index = selectedCards.indexOf(cardId);
		if (index === -1) {
			setSelectedCards([...selectedCards, cardId]);
		} else {
			const newSelectedCards = [...selectedCards];
			newSelectedCards.splice(index, 1);
			setSelectedCards(newSelectedCards);
		}
	};
	async function fetchBucket() {
		console.log("fetchBucket Called inside Bucket.jsx");
		const response = await fetch(`${BaseUrl}/bucket/${id}`, {
			method: "GET",
		});
		if (!response.ok) throw new Error(response.statusText);

		const data = await response.json();
		setBucket(data);
	}

	useEffect(() => {
		fetchBucket();
	}, []);
	console.log("bucket page");
	console.log(bucket);

	return (
		<div >
			<h1>{bucket.name}</h1>
			<div className="container">

			{bucket.cards &&
				bucket.cards.map((card) => <Card key={card._id} 
				card={card} 
				selected={selectedCards.includes(card._id)} 
				handleSelect={() => handleCardSelect(card._id)} 
				bucketId={id}
				onDelete={handleDelete}
				/>
					)}
				</div>
			<div >
				<label>
					Card name:
					<input
						value={cardDetails.name}
						onChange={(e) => setcardDetails({ name: e.target.value })}
					/>
				</label>
				<label>
					Link:
					<input
						value={cardDetails.link}
						onChange={(e) => setcardDetails({...cardDetails,link: e.target.value })}
					/>
				</label>
				<button onClick={() => newCard(id)}>Create a Card</button>
			</div>
			<BucketList setDestbucketId={setDestbucketId}/>
			<button onClick={()=>{
				const data = {
					sourceBucketId: id,
					destBucketId: destbucketId,
					cardIds: selectedCards
				}
				const requestBody = JSON.stringify(data);
				const contentLength = requestBody.length;
				fetch(`${BaseUrl}/moveCards`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Content-Length": contentLength.toString(),
					},
					body: requestBody,
				}).catch((err) => console.log(err));
				selectedCards.forEach((cardId) => {
					handleDelete(cardId);
				});
				setSelectedCards([]);
			}}>Move</button>
			<div >
			<h2>Selected Cards</h2>
			<ul>
			{selectedCards.map((cardId) => (
			<li key={cardId}>{cardId}</li>
			))}
			</ul>
			</div>
		</div>
	);
};

export default Bucket;
