export const BreedSort = (props: any) => {
  return (
    <div>
      {/* breed */}
      <div className="flex flex-col my-2 lg:items-center">
        <div>
          <div className="my-2">
            <select
              className="bg-white border border-gray-400 hover:border-gray-500 rounded shadow focus:outline-none focus:shadow-outline"
              id="breeds"
              onChange={(e) => {
                if (e.target.value == "") {
                  props.setSearch([null]);
                } else {
                  props.setSearch([e.target.value]);
                }
              }}
            >
              <option label="Search by breed"></option>
              {props.breeds.map((breed: any, i: any) => (
                <option key={i}>{breed}</option>
              ))}
            </select>
          </div>
          {/* sort */}
          <div>
            <select
              className="bg-white border border-gray-400 hover:border-gray-500 rounded shadow focus:outline-none focus:shadow-outline"
              id="sort"
              onChange={(e) => {
                if (e.target.value == "Ascending") {
                  props.setSort("asc");
                } else {
                  props.setSort("desc");
                }
              }}
            >
              <option defaultValue={"Ascending"}>Ascending</option>
              <option>Descending</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
