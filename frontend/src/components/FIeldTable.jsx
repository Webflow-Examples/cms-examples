import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function FieldTable({ selectedPreset }) {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Field Name</TableCell>
              <TableCell>Field Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedPreset.collection.fields.map((field) => (
              <TableRow
                key={field.displayName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {field.displayName}
                </TableCell>
                <TableCell>{field.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default FieldTable;
