import express from 'express';
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import Bucket from './models/Bucket.js';
import Card from './models/Card.js';
import cors from 'cors';

const app = express();
const port = 5000
app.use(cors());

var promise = mongoose.connect(
	"mongodb+srv://pravesh:e68eMaIdc1lW8yIO123*)0@cluster.egh7gxf.mongodb.net/?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);
promise.then(function (db) {
	console.log('DataBase Connected!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/buckets', async (req, res) => {
	const buckets = await Bucket.find();
	res.json(buckets);
})


app.post('/newbucket', async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	if (!req.body.name)
		return res.status(400).send("name is required");
	console.log("newbucket post recieved ", req.body.name);
	const bucket = new Bucket({ name: req.body.name });
	await bucket.save();
	res.json(bucket);
});

app.get('/cards', async (req, res) => {
	const cards = await Card.find();
	res.json(cards);
})
app.put('/delcard/:id', async (req, res) => {
	const bucketId = req.params.id;
	const cardId = req.body.cardId;
	console.log("trying to delete card");
	try {
	  const bucket = await Bucket.findById(bucketId).populate('cards');
  
	  if (!bucket) {
		return res.status(404).json({ message: `Bucket with ID ${bucketId} not found` });
	  }
  
	  const cardIndex = bucket.cards.findIndex((card) => card._id == cardId);
  
	  if (cardIndex === -1) {
		return res.status(404).json({ message: `Card with ID ${cardId} not found in bucket` });
	  }
  
	  bucket.cards.splice(cardIndex, 1);
	  await bucket.save();
	  console.log('Card deleted successfully');
	  res.status(200).json({ message: 'Card deleted successfully', bucket });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Something went wrong while deleting card', error });
	}
  });


app.get('/bucket/:id', async (req, res) => {
	const bucket = await Bucket.findById(req.params.id).populate("cards");
	res.json(bucket);
})

app.get('/card/:id', async (req, res) => {
	const card = await Card.findById(req.params.id);
	res.json(card);
})



app.post('/newCard', async (req, res) => {
	console.log("Request recived for NewCard");
	const bucket = await Bucket.findOne({ _id: req.body.bucketId});
	if (!bucket) {
		res.status(404).send('Bucket not found');
		return;
	}
	console.log("bucket found");
	const card = new Card({ name: req.body.name, link: req.body.link });
	await card.save();
	bucket.cards.push(card);
	await bucket.save();
	res.json(card);
});

app.put('/movecard', async (req, res) => {
	const { sourceBucketId, destinationBucketId, cardId } = req.body;

	try {
		const sourceBucket = await Bucket.findById(sourceBucketId).populate("cards");
		const destinationBucket = await Bucket.findById(destinationBucketId).populate("cards");
		const card = await Card.findById(cardId);

		sourceBucket.cards.pull(card);

		destinationBucket.cards.push(card);

		await sourceBucket.save();
		await destinationBucket.save();

		res.json({ message: "Card moved successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Something went wrong" });
	}
});

app.put('/movecards', async (req, res) => {
	const { sourceBucketId, destinationBucketId, cardIds } = req.body;

	try {
		const sourceBucket = await Bucket.findById(sourceBucketId).populate("cards");
		const destinationBucket = await Bucket.findById(destinationBucketId).populate("cards");

		const cardsToMove = await Card.find({ _id: { $in: cardIds } });

		sourceBucket.cards.pull(...cardsToMove);

		destinationBucket.cards.push(...cardsToMove);

		await sourceBucket.save();
		await destinationBucket.save();

		res.json({ message: "Cards moved successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Something went wrong" });
	}
});


app.listen(port, () => {
	console.log(`Server Started on ${port}`)
})
