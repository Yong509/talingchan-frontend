import TableContainer from "@mui/material/TableContainer/TableContainer";
import Paper from "@mui/material/Paper";

interface customTableProps {
  tableHead: Array<string>;
  data?: Array<string>;
  caption?: boolean;
  action?: boolean;
}

const CustomTable: React.FC = () => {
  return (
    <>
      <TableContainer component={Paper}></TableContainer>
    </>
  );
};

export default CustomTable;
