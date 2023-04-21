import React, { useMemo, useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";

const Test = () => {
  const [datas, setData] = useState([]);
  const [users, setUsers] = useState();
  console.log("====================================");
  console.log(datas);
  console.log("====================================");
  const columns = useMemo(
    () => [
      //column definitions...
      {
        accessorKey: "firstName",
        header: "First Name",
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
      },

      {
        accessorKey: "address",
        header: "Address",
      },
      {
        accessorKey: "city",
        header: "City",
      },

      {
        accessorKey: "state",
        header: "State",
      }, //end
    ],
    []
  );

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //     .then(response => response.json())
    //     .then(data => setData(data.total))
    getApiData();
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  // const getNote =()=>{

  // }
  const getApiData = async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/"
    ).then((response) => response.json());

    // update the state
    setUsers(response);
  };
  
  const data = [
    {
      firstName: "Dylan",
      lastName: "Murray",
      address: "261 Erdman Ford",
      city: "East Daphne",
      state: "Kentucky",
    },
    {
      firstName: "Raquel",
      lastName: "Kohler",
      address: "769 Dominic Grove",
      city: "Columbus",
      state: "Ohio",
    },
    {
      firstName: "Ervin",
      lastName: "Reinger",
      address: "566 Brakus Inlet",
      city: "South Linda",
      state: "West Virginia",
    },
    {
      firstName: "Brittany",
      lastName: "McCullough",
      address: "722 Emie Stream",
      city: "Lincoln",
      state: "Nebraska",
    },
    {
      firstName: "Branson",
      lastName: "Frami",
      address: "32188 Larkin Turnpike",
      city: "Charleston",
      state: "South Carolina",
    },
  ];

  const [tableData, setTableData] = useState(data);

  const handleSaveRow = async ({ exitEditingMode, row, values }) => {
    //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
    tableData[row.index] = values;
    //send/receive api updates here
    setTableData([...tableData]);
    exitEditingMode(); //required to exit editing mode
  };

  return (
    <div>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        editingMode="modal" //default
        enableEditing
        onEditingRowSave={handleSaveRow}
      />

      <div className="app">
        {users &&
          users.map((user) => (
            <div className="item-container">
              Id:{user.id} <div className="title">Title:{user.title}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Test;
