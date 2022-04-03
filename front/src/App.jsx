import {React, useEffect, useState} from 'react';
import FormData from 'form-data';
import axios from 'axios';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

const App = () =>{
  const [imagePath, setImagePath] = useState('');
  const [imageList, setImageList] = useState([]);

  useEffect(() =>{
      axios('http://localhost:5001/api/get-image-list')
      .then((res)=>{
        if(res.data.success){
          setImageList(res.data.files);
        }
      })
      .catch((err) =>{
        console.log("Failed to get Imagelist");
        console.log(err);
      });
  }, [imagePath]);

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

  useEffect(()=>{
    console.log(imageList);
  },[imageList]);

  const handleOnDragEnd = (result) =>{
    if(!result.destination){
      return;
    }
    const items = [...imageList];
    const [recordedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, recordedItem);
    setImageList(items);
  };

  const showImageList =(
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="images" direction="horizontal">
        {(provided) =>(
          <div 
            className='images'
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {
              imageList.map((imageName, id, index) =>{
                console.log(`id : ${id}`);
                console.log(`imageName : ${imageName}`);
                  return (
                  <Draggable key={id} draggableId={`${id}`} index={id}>
                    {
                      (provided) =>(
                        <img
                          src={`http://localhost:5001/images/${imageName}`} 
                          alt='서버 이미지'
                          width='230px'
                          height='300px'
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        />
                      )
                    }
                    </Draggable>
                  );
                }
              )
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable> 
    </DragDropContext>
  );

  return(
    <>
      {showImageList}
      <div>
        <input type='file' name='file' accept='image/*' onChange={handleChange}/>
      </div>
        
    </>
  );
};

export default App;
