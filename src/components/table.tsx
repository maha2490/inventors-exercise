import React from 'react';
import MuiDataTable from "mui-datatables";
import inventorsJson from "../data/inventors.json";
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"

type UiInventor = { id: number, firstName: string, funFact: string, knownFor: string[], lastName: string, year: number };
type OpenModalState = { isOpen: true, inventor?: UiInventor };

export const columns = [
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
  {
    name: "knownFor",
    label: "Known For"
  }
];

export const DataTable = () => {
  const [factModalState, setFactModalState] = React.useState<{ isOpen: false } | OpenModalState>({ isOpen: false });
  const inventorsData = React.useMemo<UiInventor[]>(() => inventorsJson.inventors.map(invntr => ({
    id: invntr.id,
    firstName: invntr.first,
    lastName: invntr.last,
    year: invntr.year,
    knownFor: invntr.known_for,
    funFact: invntr.fun_fact
  })), [])

  const handleRowClick = (rowData: string[]) => setFactModalState({ isOpen: true, inventor: inventorsData.find(invntr => invntr.firstName === rowData[0]) });
  const handleModalClose = () => setFactModalState({ isOpen: false })

  return (
    <>
      <h3 id="inventors-table-title">Well-known Inventors</h3>
      <div id="table-container" aria-labelledby="inventors-table-title">
        <MuiDataTable
          title=""
          data={inventorsData}
          columns={columns}
          options={{
            download: false,
            onRowClick: handleRowClick,
            print: false,
            selectableRows: "none",
            tableId: "inventors-table"
          }}
        />
      </div>
      {factModalState.isOpen && (
        <Dialog open={true} onClose={handleModalClose} aria-labelledby="fun-fact-dialog-title">
          <DialogTitle id="fun-fact-dialog-title">Did you know??</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <p><b>{factModalState?.inventor?.firstName}&nbsp;{factModalState?.inventor?.lastName}</b></p>
              <p>{factModalState?.inventor?.funFact}</p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose}>Ok, got it</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
