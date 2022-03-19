import {React, useState} from 'react';
import FormData from 'form-data';
import axios from 'axios';

const App = () =>{
  const [image, setImage] = useState();
  const formData = new FormData();

  const handleChange = (e) =>{
    if(e.target.files){
      setImage(e.target.files[0]);
      formData.append('files', image);
    }
  }

  const sendImage = () =>{
    console.log('send Image to server!');

    axios({
      method:'post',
      url:'http://localhost:5000/api/image-upload',
      data: formData,
      headers:{
        'Content-Type': 'multipart/form-data',
      }
    })
    .then((res)=>{
      console.log('image send Success!');
      console.log(`res : ${res}`);
    })
    .catch((err) =>{
      console.log('image send Failed!')
      console.log(`err : ${err}`);
    });
  }

  return(
    <div>
      <input type='file' name='file' accept='image/*' onChange={handleChange}/>
      <button type='button' onClick={sendImage}>
        Send Image
      </button>
    </div>
  );
};

export default App;
