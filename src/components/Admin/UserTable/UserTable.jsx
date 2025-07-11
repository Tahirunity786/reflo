'use client';

import { useState } from 'react';
import UserRow from '../UserRow/UserRow';


export default function UserTable() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const users = [
    {
      id: 1,
      name: 'Neil Sims',
      email: 'neil.sims@flowbite.com',
      position: 'React Developer',
      image: '/docs/images/people/profile-picture-1.jpg',
      online: true,
    },
    {
      id: 2,
      name: 'Bonnie Green',
      email: 'bonnie@flowbite.com',
      position: 'Designer',
      image: '/docs/images/people/profile-picture-3.jpg',
      online: true,
    },
    {
      id: 3,
      name: 'Jese Leos',
      email: 'jese@flowbite.com',
      position: 'Vue JS Developer',
      image: '/docs/images/people/profile-picture-2.jpg',
      online: true,
    },
    {
      id: 4,
      name: 'Thomas Lean',
      email: 'thomes@flowbite.com',
      position: 'UI/UX Engineer',
      image: '/docs/images/people/profile-picture-5.jpg',
      online: true,
    },
    {
      id: 5,
      name: 'Leslie Livingston',
      email: 'leslie@flowbite.com',
      position: 'SEO Specialist',
      image: '/docs/images/people/profile-picture-4.jpg',
      online: false,
    },
  ];

  return (
    <div className="relative overflow-x-auto p-3">
      {/* Header: Dropdown & Search */}
      <div className="flex items-center justify-between flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 p-3 bg-white dark:bg-gray-900">
        {/* Dropdown Button */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            type="button"
          >
            Action
            <svg className="w-2.5 h-2.5 ms-2.5" fill="none" viewBox="0 0 10 6">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
              <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reward</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Promote</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Activate</a></li>
              </ul>
              <div className="py-1">
                <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-400 dark:hover:text-white">Delete User</a>
              </div>
            </div>
          )}
        </div>

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            id="table-search-users"
            placeholder="Search for users"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeWidth="2" d="M19 19l-4-4m0-7A7 7 0 111 8a7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="p-4">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
            </th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Position</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
