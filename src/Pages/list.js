import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import MaterialReactTable from "material-react-table";
import { Button } from "@mui/material";
import { json, useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";

const List = () => {
  const navigate = useNavigate();
  
  const [tableData, setTableData] = useState([]);
  const [tableUpdate, setTableUpdate] = useState([]);
 

  const columns =
     [
      //column definitions...
      {
        accessorKey: "id",
        header: "Id",
      },
      {
        accessorKey: "description",
        header: "Description",
      },

      {
        accessorKey: "dateTime",
        header: "Date Time",
      },
      {
        accessorKey: "imageUrl",
        header: "ImageUrl",
      },
    ]
  

  // const getNote =()=>{

  // }
  const getApiData = async () => {
    const response = await fetch("http://localhost:9090/getAllNotes").then(
      (response) => response.json()
    );

    // update the state
    setTableData(response);
  };
 

 
  useEffect(() => {
    getApiData();
    // console.log("desc",tableData[0]);
  }, []);
  // console.log("data",tableData[0].description);

  const updateData = async (e) => {
    // e.preventDefault();
    console.log("update Data");

    const bodyParameters = {
      
      description:tableData[0].description,
      dateTime:tableData[0].dateTime,
      imageUrl:tableData[0].name
    };
    

    await axios
      .put("http://localhost:9090/updateNote", bodyParameters)
      .then((response) => {
        if (response.status === 200) {
          alert("Data updated.");
         
        } else {
          alert("Please check update information.");
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
        alert("Please check update information.");
      });
}
// console.log("delete id",tableData[0].description);
// let id =tableData[0].id
const deleteData = async (id) => {
  // e.preventDefault();

  

  console.log("desc",id);
  await axios
    .delete(`http://localhost:9090/deleteNote/${id}`)
    .then((response) => {
      if (response.status === 200) {
        alert("Data Deleted.");
       
      } else {
        alert("Please check Id.");
      }
    })
    .catch((error) => {
      alert(error.response.data.message);
      alert("Please check Delete information.");
    });
}
  const handleDeleteRow = useCallback(
    (row) => {
     
      //send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
      console.log("handleDeleteRow",row.id);
      deleteData(row.id);
    },
    [tableData]
   
  );


  const handleSaveRow = async ({ exitEditingMode, row, values }) => {
    //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
    
    tableData[row.index] = values;
    //send/receive api updates here
    

    setTableData([...tableData]);
    exitEditingMode(); //required to exit editing mode
    console.log("update Method",tableData);
    updateData();
  };
  const nav = () => {
    navigate("/Home");
  };
  let tb_data = tableData.map((item) => {
    return item.id, item.description, item.dateTime, item.imageUrl;
  });
  useEffect (()=>{
    console.log('====================================');
    console.log(tb_data);
    console.log('====================================');
  })

  return (
    <div>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        editingMode="modal" //default
        enableEditing
        onEditingRowSave={handleSaveRow}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onChange={updateData} onClick={(event) =>table.setEditingRow(row)
                } >
                <Edit/>
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            const updatedRows = [...tableData, { id: Math.floor(Math.random() * 100), ...newRow }]
            setTimeout(() => {
              setTableData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowDelete: selectedRow => new Promise((resolve, reject) => {
            const index = selectedRow.tableData.id;
            const updatedRows = [...tableData]
            updatedRows.splice(index, 1)
            setTimeout(() => {
              setTableData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
            const index=oldRow.tableData.id;
            const updatedRows=[...tableData]
            updatedRows[index]=updatedRow
            setTimeout(() => {
              setTableData(updatedRows)
              resolve()
            }, 2000)
          })

        }}
      />

      {/* <div className="app">
        {users &&
          users.map((user) => (
            <div className="item-container">
              Id:{user.id} <div className="title">Title:{user.title}</div>
            </div>
          ))}
      </div> */}
      <Button onClick={nav}>Home</Button>
    </div>
  );
};

export default List;
