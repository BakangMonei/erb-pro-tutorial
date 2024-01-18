import React, { useState, useEffect } from "react";
import PocketBase from "pocketbase";

function App() {
  const [data, setData] = useState([
    { registrationNumber: "", certificateNumber: "" },
  ]);

  useEffect(() => {
    const pb = new PocketBase("https://certificates.erb.org.bw/db");

    // Fetch data from the collection using PocketBase
    const fetchData = async () => {
      try {
        const response = await pb.collection("certificates").getFullList({
          fields: "registrationNumber, certificateNumber",
        });
        console.log("Data fetched successfully:", response);
        setData(response || []); // Ensure that response.records is defined
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {/* <h1>{data[0].certificateNumber}</h1>/ */}
      <table>
        <thead>
          <tr>
            <th>Registration Number</th>
            <th>Certificate Number</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr>
              <td>{item.registrationNumber}</td>
              <td>{item.certificateNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
