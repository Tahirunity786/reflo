import Image from 'next/image';

export default function UserRow({ user }) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="w-4 p-4">
        <input
          id={`checkbox-${user.id}`}
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
        />
      </td>
      <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
        <Image
          className="w-10 h-10 rounded-full"
          src={user.image}
          alt={`${user.name} image`}
          width={40}
          height={40}
        />
        <div className="ps-3">
          <div className="text-base font-semibold">{user.name}</div>
          <div className="font-normal text-gray-500">{user.email}</div>
        </div>
      </th>
      <td className="px-6 py-4">{user.position}</td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className={`h-2.5 w-2.5 rounded-full me-2 ${user.online ? 'bg-green-500' : 'bg-red-500'}`}></div>
          {user.online ? 'Online' : 'Offline'}
        </div>
      </td>
      <td className="px-6 py-4">
        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
      </td>
    </tr>
  );
}