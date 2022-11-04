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
import { CartModel } from "model/cart_model";

interface columnTable {
  title: string;
  style: string;
}

interface customTableProps {
  tableHead: Array<columnTable>;
  data?: Array<Array<string>>;
  total?: boolean;
  deleteAble?: boolean;
  customer?: string;
  btCaptionTitle?: String;
  onOpen?: (id: number) => void;
  onDelete?: (product: string) => void;
  onPurchase?: () => void;
  onOrder?: (order: Array<Array<string>>) => void;
}

const CustomTable: React.FC<customTableProps> = (props: customTableProps) => {
  const getStripedStyle = (index: number) => {
    return { background: index % 2 ? "#f7f7f7" : "white" };
  };

  const calculateTotalPrice = (data: Array<Array<string>>) => {
    let total: number = 0;
    data.map((item) => {
      total += parseFloat(item[4]?.toString());
    });
    return total;
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          {props.total ? (
            <caption>
              <div className="grid grid-cols-8 items-center">
                <div className={`col-span-5`}>
                  <Typography
                    id="total_text"
                    variant="body1"
                    align="left"
                    color="text.primary"
                    sx={{
                      fontWeight: "750",
                    }}
                  >
                    {props.customer != undefined ? props.customer : ""}
                    &nbsp;&nbsp;&nbsp;&nbsp;TOTAL
                  </Typography>
                </div>
                <div className="col-span-2">
                  <Typography
                    id="total_price"
                    variant="body1"
                    align="center"
                    color="text.primary"
                    sx={{
                      fontWeight: "750",
                    }}
                  >
                    {calculateTotalPrice(props.data!)}
                  </Typography>
                </div>
                <div>
                  {props.onOrder != null ? (
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={() => {
                        props.onOrder?.(props.data!);
                      }}
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
                      {props.btCaptionTitle}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={props.onPurchase}
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
                      {props.btCaptionTitle}
                    </Button>
                  )}
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
                  return <TableCell key={index}>{item.title}</TableCell>;
                } else {
                  return (
                    <TableCell
                      className={`${item.style}`}
                      align="right"
                      key={index}
                    >
                      {item.title}
                    </TableCell>
                  );
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
                  console.log(row[1]);
                  props.onOpen?.(parseInt(row[0]));
                }}
                style={{ ...getStripedStyle(index) }}
                key={index}
              >
                {row.map((item, index) => {
                  if (index == 0) {
                    return (
                      <TableCell
                        key={index}
                        align="left"
                        sx={{
                          maxWidth: "100px",
                          wordBreak: "break-word",
                        }}
                      >
                        {item}
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell
                        key={index}
                        align="right"
                        sx={{
                          maxWidth: "100px",
                          wordBreak: "break-word",
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
                        props.onDelete?.(row[1]);
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
