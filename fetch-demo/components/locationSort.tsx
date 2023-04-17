import { stateAbbreviations } from "../components/stateAbbrev";

export const LocationSort = (props: any) => {
  return (
    <>
      <div className="flex flex-col lg:items-center">
        <div>
          <div className="flex flex-row ">
            {/* city */}
            <div className="my-2">
              <input
                className="bg-white border px-2 border-gray-400 hover:border-gray-500 rounded shadow focus:outline-none focus:shadow-outline"
                id="city"
                placeholder="City"
                onChange={(e) => {
                  if (e.target.value == "") {
                    props.setCity("");
                  } else {
                    props.setCity(e.target.value);
                  }
                }}
              />
            </div>
            {/* state */}
            <div className="m-2">
              <select
                className="bg-white border border-gray-400 hover:border-gray-500 rounded shadow focus:outline-none focus:shadow-outline"
                id="state"
                onChange={(e) => {
                  if (e.target.value == "") {
                    props.setState([]);
                  } else {
                    props.setState([e.target.value]);
                  }
                }}
              >
                <option label="State"></option>
                {stateAbbreviations.map((state: any, i: any) => (
                  <option key={i}>{state}</option>
                ))}
              </select>
            </div>
          </div>
          {/* zip code */}
          <div>
            <input
              className="bg-white border px-2 border-gray-400 hover:border-gray-500 rounded shadow focus:outline-none focus:shadow-outline"
              id="zip"
              placeholder="Zip Code"
              onChange={(e) => {
                if (e.target.value == "") {
                  props.setZips([null]);
                } else {
                  props.setZips([e.target.value]);
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
