import TableContainer from "@mui/material/TableContainer/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table/Table";
import TableHead from "@mui/material/TableHead/TableHead";
import TableCell from "@mui/material/TableCell/TableCell";
import TableBody from "@mui/material/TableBody/TableBody";
import TableRow from "@mui/material/TableRow/TableRow";
import Image from "next/image";
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button/Button";
interface customTableProps {
  tableHead: Array<string>;
  data?: Array<Array<string>>;
  total?: boolean;
  deleteAble?: boolean;
  onOpen?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const CustomTable: React.FC<customTableProps> = (props: customTableProps) => {
  const getStripedStyle = (index: number) => {
    return { background: index % 2 ? "#f7f7f7" : "white" };
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          {props.total ? (
            <caption>
              <div className="grid grid-cols-8">
                <div className="col-span-5">
                  <Typography
                    id="total_text"
                    variant="body1"
                    align="center"
                    color="text.primary"
                    sx={{
                      fontWeight: "750",
                    }}
                  >
                    Total
                  </Typography>
                </div>
                <div className="col-span-2"></div>
                <div>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      width: {
                        xs: "75px",
                        md: "100px",
                      },
                      height: {
                        xs: "33px",
                        md: "45px",
                      },
                      fontSize: {
                        xs: "12px",
                        md: "16px",
                      },
                    }}
                    style={{
                      marginLeft: "12px",
                      borderRadius: "10px",
                      backgroundColor: "#4caf50",
                    }}
                  >
                    Order
                  </Button>
                </div>
              </div>
            </caption>
          ) : (
            <></>
          )}
          <TableHead sx={{ backgroundColor: "#f2f1f0" }}>
            <TableRow>
              {props.tableHead?.map((item, index) => {
                if (index == 0) {
                  return <TableCell>{item}</TableCell>;
                } else {
                  return <TableCell align="right">{item}</TableCell>;
                }
              })}

              {props.deleteAble ? (
                <TableCell align="right">Delete</TableCell>
              ) : (
                <></>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data!.map((row, index) => (
              <TableRow
                id="table-row"
                onClick={() => {
                  console.log("click id = " + row[0]);
                  props.onOpen?.(parseInt(row[0]));
                }}
                style={{ ...getStripedStyle(index) }}
                key={index}
              >
                {row.map((item, index) => {
                  if (index == 0) {
                    return (
                      <TableCell
                        align="left"
                        sx={{
                          maxWidth: "100px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item}
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell
                        align="right"
                        sx={{
                          maxWidth: "100px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item}
                      </TableCell>
                    );
                  }
                })}
                {props.deleteAble ? (
                  <TableCell width="10%" align="right">
                    <Image
                      src="/trash.svg"
                      width={30}
                      height={30}
                      id="trash-icon"
                      onClick={(e) => {
                        props.onDelete?.(parseInt(row[0]));
                      }}
                    />
                  </TableCell>
                ) : (
                  <></>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomTable;
