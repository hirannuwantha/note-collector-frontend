import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ImageUploading from "react-images-uploading";
import axios from "axios";
import { json, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const maxNumber = 5;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    // console.log(imageList);
    setImages(imageList);
  };
const nav =()=>{
  navigate("/List")
}
  const dataAdd = async (e) => {
    e.preventDefault();

    const bodyParameters = {
      
      description:description,
      dateTime:Date().toLocaleString(),
      imageUrl:images[0].file.name
    };
    console.log(images[0].file.name);

    await axios
      .post("http://localhost:9090/addNotes", bodyParameters)
      .then((response) => {
        if (response.status === 200) {
          alert("Data Added.");
         
          // setToken(response.data.output);
          // sessionStorage.setItem("token", response.data.data.token);
        } else {
          alert("Please check your adding data");
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
        alert("Invalid.");
      });
  };


  // const getData = () => {
  //   fetch("https://jsonplaceholder.typicode.com/todos/1")
  //     .then((response) => response.json())
  //     .then((json) => console.log(json));
  // };


  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <h2>Note Collector</h2>
      </div>
      <div>
        <textarea placeholder="Descriptions" rows={15} cols={103} onChange={e => setDescription(e.target.value)}/>
      </div>
      <div>
        <h3>Image Uploader</h3>
      </div>
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <div className="App">
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <button
                  style={{
                    backgroundColor: "#07b825",
                    width: 110,
                    color: "#fff",
                    borderRadius: 10,
                  }}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Add or Drop here
                </button>
                &nbsp;
                <button
                  onClick={onImageRemoveAll}
                  style={{
                    width: 110,
                    backgroundColor: "#f01b13",
                    color: "#fff",
                    borderRadius: 10,
                  }}
                >
                  Remove all images
                </button>
                <div>
                  {imageList.map((image, index) => (
                    <div
                      key={index}
                      className="image-item"
                      style={{  flexDirection: "row" }}
                    >
                      <img src={image["data_url"]} alt="" width="100" />
                      <div
                        className="image-item__btn-wrapper"
                        style={{ width: 400 }}
                      >
                        <button
                          onClick={() => onImageUpdate(index)}
                          style={{
                            backgroundColor: "#0417e0",
                            color: "#fff",
                            borderRadius: 10,
                          }}
                        >
                          Update
                        </button>
                        <button
                          onClick={() => onImageRemove(index)}
                          style={{
                            backgroundColor: "#f01b13",
                            color: "#fff",
                            borderRadius: 10,
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ImageUploading>
        </div>
      </div>
      <div
        style={{
          marginTop: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{flexDirection:'row'}}>
        <Button variant="contained" color="success" onClick={dataAdd}>
          Success
      </Button>
      <Button style={{marginLeft:20}} variant="contained" onClick={nav}>
          View
      </Button>
        </div>
     
      </div>
    </div>
  );
}
