import React from "react";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
      <div className="bg-primary/10 p-4 rounded-md text-center">
        <h2 className="text-primary font-bold text-xl">Total Products</h2>
        <p className=" font-bold text-3xl">333</p>
      </div>
      <div className="bg-primary/10 p-4 rounded-md text-center">
        <h2 className="text-primary font-bold text-xl">Total Orders</h2>
        <p className=" font-bold text-3xl">333</p>
      </div>
      <div className="bg-primary/10 p-4 rounded-md text-center">
        <h2 className="text-primary font-bold text-xl">Total Delivery</h2>
        <p className=" font-bold text-3xl">333</p>
      </div>
    </div>
  );
};

export default Dashboard;
