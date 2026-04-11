const SearchInput = () => {
    return (
        <div className="flex items-center gap-2">
            <input placeholder="Search for cities..." className="rounded-full px-4 py-2 outline-none focus:ring-4 focus:ring-blue-200 duration-200 border border-blue-500 min-w-100" />
            <button className="rounded-full text-white px-4 py-2 outline-none border border-blue-500 bg-blue-500 hover:bg-blue-600 font-semibold cursor-pointer">Add City</button>
        </div>
    )
}
export default SearchInput
