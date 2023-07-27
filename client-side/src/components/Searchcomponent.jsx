export default function SearchComponent() {
  return (
    <div className="lg:max-w-[1024px] flex justify-center">
      <div className="my-4 flex items-center">
        <div className="border-purple-200 flex rounded border">
          <input
            type="text"
            className="text-purple-700 bg-white focus:border-purple-400 focus:ring-purple-300 block w-full rounded-md border px-4 py-2 focus:outline-none focus:ring focus:ring-opacity-40 sm:mr-2 sm:w-auto"
            placeholder="Search..."
          />
          <button className="text-white bg-purple-600 rounded border-l px-4 sm:w-auto">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
