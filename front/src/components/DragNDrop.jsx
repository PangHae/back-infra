import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';

const DragNDrop = ({onChangeImagePath}) => {
  const onDrop = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
      formData.append('files', acceptedFiles[0]);
      await axios({
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
          onChangeImagePath(res.data.filePath);
        }
      })
      .catch((err) =>{
        console.log('image send Failed!')
        console.log(`err : ${err}`);
      });
  }, [onChangeImagePath])
  
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


  const InputProps = {
    ...getInputProps(),
    multiple: false,
    accept: "image/*",
  };

  const RootProps = {
    ...getRootProps(),
  };

  const style = {
    width:'400px', 
    height:'200px', 
    border:'2px solid black', 
    borderRadius:'5%',
    margin:'0px',
    textAlign:'center',
    backgroundColor: isDragActive
            ? 'gray'
            : 'white'
  }

  return (
      <div {...RootProps} style={style}>
        <input {...InputProps} />
        {/* {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        } */}
        <PlusOutlined style={{fontSize:'200px'}}/>
      </div>
  );
}

export default DragNDrop;