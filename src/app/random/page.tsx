"use client";
import React, { useState } from "react";

const page = () => {
  const [data, setdata] = useState("");
  const onchange = (e: any) => {
    setdata(e.target.value);
  };

  const addTodo = async () => {
  
    const tempData = {
        email : "harshil@gmail.com",
        name : "harshil"
    }
    const apiData = await fetch("/api/addTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tempData),
    });
    console.log("Data::", apiData);
  };

 

  return (
    <div>
      <div>Add Todos</div>
      <div>
        Enter Text :{" "}
        <input
          className="text-black"
          type="text"
          name="todo"
          id="todo"
          value={data}
          onChange={onchange}
        />
      </div>
      <div>
        <button type="button" onClick={addTodo}>
          Add
        </button>
      </div>
    </div>
  );
};

export default page;
