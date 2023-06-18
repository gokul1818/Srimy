import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
const Clock = () => {
  const [date, setdate] = useState();
  const [hour, sethour] = useState();
  const [minutes, setminutes] = useState();
  const [seconds, setseconds] = useState();
  const [offers, setOffers] = useState([]);
  // const [limit, setlimit] = useState();
  let interval;

  useEffect(() => { 
    // Get Firestore instance
    const db = getFirestore();

    const fetchLimitedOffers = async () => {
      try {
        // Retrieve limited offers from Firestore
        const querySnapshot = await getDocs(collection(db, "limitedOffers"));

        // Map the query snapshot to an array of limited offers
        const limitedOffers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Update the state with the retrieved limited offers
        setOffers(limitedOffers);
      } catch (error) {
        console.error("Error fetching limited offers:", error);
      }
    };

    // Call the fetchLimitedOffers function when the component mounts
    fetchLimitedOffers();
  }, []); // Empty dependency array

  //  console.log(offers,'limit')
  // console.log(limit, "limi");

  const countDown = () => {
    // const data = (offers.map((data) => data.endDate.toDate().getTime()))
    // setlimit(offers.map((data) => data.endDate.toDate().getTime()));
    // const destination = offers.map((data)=>(data.endDate.seconds))
    const destination = new Date("29 may 2023").getTime();
    // const destination = offers.map((data) => data.endDate.toDate().getTime());
    // console.log(destination, "limit");
    interval = setInterval(() => {
      const now = new Date().getTime();
      const different = destination - now;
      const date = Math.floor(different / (1000 * 60 * 60 * 24));
      const hour = Math.floor(
        (different % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((different % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((different % (1000 * 60)) / 1000);

      if (destination < 0) clearInterval(interval.current);
      else {
        setdate(date);
        sethour(hour);
        setminutes(minutes);
        setseconds(seconds);
      }
    });
  };
  useEffect(() => {
    countDown();
  }, []);
  return (
    <div className="clock_wrapper d-flex align-items-center gap-3 ps-5 mt-4">
      <div>
        <h2>Limited Offers</h2>
        {offers.length === 0 ? (
          <p>No limited offers available.</p>
        ) : (
          <ul>
            {offers.map((offer) => (
              <li key={offer.id}>
                <h3>{offer.productName}</h3>
                <p>{offer.description}</p>
                <p>Original Price: ${offer.originalPrice}</p>
                <p>Discounted Price: ${offer.discountedPrice}</p>
                <p>
                  {/* Start Date: {offer.startDate.toDate().toLocaleDateString()} */}
                </p>
                <p>End Date: {offer.endDate.toDate().toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="clock_data d-flex align-items-center gap-3">
        <div className="text-center fs-6">
          <h3>{date}</h3>
          <h5>days</h5>
        </div>
        <span className="fs-1 mb-3">:</span>
      </div>
      <div className="clock_data d-flex align-items-center gap-3">
        <div className="text-center">
          <h3>{hour}</h3>
          <h5>hours</h5>
        </div>
        <span className="fs-1 mb-3">:</span>
      </div>
      <div className="clock_data d-flex align-items-center gap-3">
        <div className="text-center">
          <h3>{minutes}</h3>
          <h5>minutes</h5>
        </div>
        <span className="fs-1 mb-3">:</span>
      </div>
      <div className="clock_data d-flex align-items-center gap-3">
        <div className="text-center">
          <h3>{seconds}</h3>
          <h5>seconds</h5>
        </div>
      </div>
    </div>
  );
};
export default Clock;
