import MuiDataTable from "mui-datatables";
import inventorsJson from "../data/inventors.json";

type InventorData = { inventors: { first: string, last: string, year: number }[] }

export const DataTable = () => {
  const columns = [
    {
      name: "firstName",
      label: "First Name",
      options: {
        sort: true
      }
    },
    {
      name: "lastName",
      label: "Last Name",
      options: {
        sort: true
      }
    },
    {
      name: "year",
      label: "Year",
      options: {
        sort: true
      }
    },
  ];

  const inventorsData: InventorData = inventorsJson;
  const data = inventorsData.inventors.map((invntr) => ({
    firstName: invntr.first,
    lastName: invntr.last,
    year: invntr.year
  }));

  return (
    <>
      <div id="table-container">
        <MuiDataTable
          title="Inventors"
          data={data}
          columns={columns}
          options={{
            download: false,
            print: false,
            selectableRows: "none",
            tableId: "inventors-table"
          }}
        />
      </div>
    </>
  );
}
