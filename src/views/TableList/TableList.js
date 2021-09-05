import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import TableWithRadio from "components/Table/TableWithRadio";
import Table from "components/Table/Table";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import data from "assets/data/HR.json";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  const [apiTarget, setAPiTarget] = React.useState("");
  const [employeeData, setEmployeeData] = React.useState("Loading");
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    fetchEmployeeData(apiTarget);
  }, [apiTarget]);
  async function fetchEmployeeData(deptName) {
    let cleanedDataArray = [];
    const response = await fetch(
      `https://randomuser.me/api/?seed=${deptName}&results=10`
    );
    const data = await response.json();
    const dataToClean = data.results;
    dataToClean.map((el) => cleanedDataArray.push(cleanDataForTable(el)));
    setEmployeeData(cleanedDataArray);
    setIsLoading(false);
  }
  function handleRadioButton(event) {
    const radioButtonTarget = event.target.value;
    const targetDept = getDept(radioButtonTarget);
    setAPiTarget(targetDept);
  }
  function getDept(str) {
    let target = str.indexOf(",");
    return str.slice(0, target);
  }
  function prepDataForDeptTable(data) {
    let result = data.map((el) => Object.values(el));
    result.map((el) => el.push(`${el[3].name.first} ${el[3].name.last}`));
    result.map((el) => el.splice(3, 1));
    result.map((el) => el.splice(0, 1));
    return result;
  }
  function cleanDataForTable(item) {
    let employeeData = [];
    const fullName = `${item.name.first} ${item.name.last}`;
    const age = item.dob.age;
    const timeWithCompany = item.registered.age;
    const email = item.email;
    const location = `${item.location.city}, ${item.location.country}`;
    const phone = item.cell;
    employeeData.push(fullName, location, age, timeWithCompany, email, phone);
    return employeeData;
  }
  const deptTable = prepDataForDeptTable(data.departments);
  let loadingMessage = ["Data is loading"];
  console.log(employeeData);
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Departments</h4>
            <p className={classes.cardCategoryWhite}>
              Table of Departments and Managers
            </p>
          </CardHeader>
          <CardBody>
            <TableWithRadio
              tableHeaderColor="primary"
              tableHead={["Department", "City", "Managed By"]}
              tableData={[...deptTable]}
              handleRadioButton={handleRadioButton}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Table on Plain Background
            </h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={[
                "Name",
                "Location",
                "Age",
                "Years with company",
                "Email",
                "Mobile Number",
              ]}
              tableData={isLoading ? [[...loadingMessage]] : [...employeeData]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
