"use client";

import { cleanUser } from "@/libs/cleanUser";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserCard } from "@/components/UserCard";

export default function RandomUserPage() {
  //user = null or array of object
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [genAmount, setGenAmount] = useState(1);
  const [isFirst, setIsFirst] = useState(true);
  const generateBtnOnClick = async () => {
    setIsLoading(true);
    const resp = await axios.get(
      `https://randomuser.me/api/?results=${genAmount}`
    );
    setIsLoading(false);
    const users = resp.data.results;
    //Your code here
    //Process result from api response with map function. Tips use function from /src/libs/cleanUser
    //Then update state with function : setUsers(...)
    const cleanedUsers = users.map((x) => cleanUser(x));
    setUsers(cleanedUsers);
  };
  useEffect(() => {
    if (isFirst) {
      setIsFirst(false);
      return;
    }
    localStorage.setItem("Amount", genAmount);
  }, [genAmount]);

  useEffect(() => {
    const num = JSON.parse(localStorage.getItem("Amount"));
    setGenAmount(num);
  }, []);

  return (
    <div style={{ maxWidth: "700px" }} className="mx-auto">
      <p className="display-4 text-center fst-italic m-4">Users Generator</p>
      <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
        Number of User(s)
        <input
          className="form-control text-center"
          style={{ maxWidth: "100px" }}
          type="number"
          onChange={(e) => setGenAmount(e.target.value)}
          value={genAmount}
        />
        <button className="btn btn-dark" onClick={generateBtnOnClick}>
          Generate
        </button>
      </div>
      {isLoading && (
        <p className="display-6 text-center fst-italic my-4">Loading ...</p>
      )}
      {users &&
        !isLoading &&
        users.map((users, n) => (
          <UserCard
            key={n}
            name={users.name}
            imgUrl={users.imgUrl}
            address={users.address}
            email={users.email}
          ></UserCard>
        ))}
    </div>
  );
}
