import {React, useState} from 'react';
import FormData from 'form-data';
import axios from 'axios';

const App = () =>{
  const [imagePath, setImagePath] = useState('');

  const handleChange = (e) =>{
    if(e.target.files){
      const formData = new FormData();
      formData.append('files', e.target.files[0]);
      axios({
        method:'post',
        url:'http://localhost:5001/api/image-upload/',
        data: formData,
        headers:{
          'Content-Type': 'multipart/form-data',
        }
      })
      .then((res)=>{
        console.log('image send Success!');
        console.log(res);
        if(res.data.success){
          setImagePath(res.data.filePath);
        }
      })
      .catch((err) =>{
        console.log('image send Failed!')
        console.log(`err : ${err}`);
      });
    }
  }

  return(
    <>
      <div>
        <input type='file' name='file' accept='image/*' onChange={handleChange}/>
      </div>
        {
          imagePath === '' ? null
            : <div>
                <img src={`http://localhost:5001/${imagePath}`} alt='서버 이미지'/>
              </div>
        }
    </>
  );
};

export default App;
