import { useState } from "react";
const BaseUrl = "http://localhost:5000";
const Card = ({ card, handleSelect, selected, bucketId ,onDelete }) => {
  const [loaded, setLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };
  async function trydelete() {
    const data = {
      bucketId: bucketId,
      cardId: card._id,
    };
    const requestBody = JSON.stringify(data);
    const contentLength = requestBody.length;
    const response = await fetch(`${BaseUrl}/delcard/${bucketId}`, {
      method: "PUT",
      headers: {
		"Content-Type": "application/json",
		"Content-Length": contentLength.toString(),
	},
	body: requestBody,
    });
    if (!response.ok) throw new Error(response.statusText);
	onDelete(card._id);
  }

  return (
    <div className="card-container">
      <h2 className="card-title">{card.name}</h2>
      {loaded ? (
        <iframe
          title={card.name}
          src={card.link}
          width="560"
          height="315"
          allowFullScreen
          onLoad={handleLoad}
        />
      ) : (
        <div>Loading...</div>
      )}
      {modalOpen && (
        <div className="modal">
          <button className="modal-close" onClick={() => setModalOpen(false)}>Close</button>
          {loaded ? (
            <iframe
              title={card.name}
              src={card.link}
              width="560"
              height="315"
              allowFullScreen
              onLoad={handleLoad}
            />
          ) : (
            <div>Loading...</div>
          )}
        </div>
      )}
      <button className="play-button" onClick={() => setModalOpen(true)}>play</button>
      <button className="delete-button" onClick={trydelete}>Del</button>
      <input
        type="checkbox"
        checked={selected}
        onChange={() => handleSelect(card._id)}
      />
    </div>
  );
};

export default Card;
