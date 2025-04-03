import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-700 text-white p-2 rounded-md focus:outline-none"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button className="bg-gray-700 p-2 rounded-md">Notifications</button>
        <div className="bg-gray-700 p-2 rounded-md">User Profile</div>
      </div>
    </header>
  );
};

export default Header;
