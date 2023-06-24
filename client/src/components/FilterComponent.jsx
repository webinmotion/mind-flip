export default function Filter() {
  return (
    <div className="flex flex-col lg:mr-2">
      {/* <h2 className="text-stone-600 mb-4 text-xl font-bold">
        Filter
      </h2> */}

      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1">
          <div className="flex flex-col">
            <label for="name" className="text-stone-600 text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="john doe"
              className="p-2 border-gray-300 focus:border-orange-300 focus:ring-orange-200 mt-2 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            />
          </div>

          <div className="flex flex-col">
            <label for="email" className="text-stone-600 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="johndoe@example.com"
              className="p-2 border-gray-300 focus:border-orange-300 focus:ring-orange-200 mt-2 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            />
          </div>

          <div className="flex flex-col">
            <label for="date" className="text-stone-600 text-sm font-medium">
              Published Date
            </label>
            <input
              type="date"
              id="date"
              className="p-2 border-gray-300 focus:border-orange-300 focus:ring-orange-200 mt-2 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            />
          </div>

          <div className="flex flex-col">
            <label for="status" className="text-stone-600 text-sm font-medium">
              Status
            </label>

            <select
              id="status"
              className="border-gray-300 focus:border-orange-300 focus:ring-orange-200 mt-2 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            >
              <option>Created </option>
              <option>Accepting </option>
              <option>Playing </option>
              <option>Completed  </option>
              <option>Archived   </option>
            </select>
          </div>
        </div>

        <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
          <button className="text-stone-50 bg-stone-400 hover:bg-stone-500 text-white shadow-stone-200 translate-10 rounded-lg px-4 py-2 font-bold shadow-lg transition duration-200 ease-in-out">
            Reset
          </button>

          <button className="text-orange-50 bg-orange-400 hover:bg-orange-500 text-white shadow-orange-200 translate-10 rounded-lg px-4 py-2 font-bold shadow-lg transition duration-200 ease-in-out">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
