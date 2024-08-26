import { Button } from '@mui/material';
import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { addWidget } from '../store/reducers/categoryReducer';

const AddWidget = (props) => {
  const [title , setTitle] = useState();
  const [text , setText] = useState();
  const [clicked , setClicked] = useState(false);
  const dispatch = useDispatch();

  const AddtoCategory = () => {
    if(!text || !title){
      alert("title and text cant be empty");
      return;
    }
    const wid = props.size + 1;
    const cid = props.cid;
    const data = {cid , wid , title , text};
    dispatch(addWidget(data));
    setClicked(false);
  }
  return (
    <div className='flex flex-col gap-4 p-2 h-56 w-96 rounded-xl bg-white'>
     <div style={{'width':'100%', 'height':'100%', 'display':'flex' , 'justifyContent':'center' , 'alignItems':'center'}}>
        {clicked ? null : <Button onClick={()=>setClicked(true)} variant={'outlined'} >Add Widget +</Button>}
        {
          clicked ? 
            <div className='flex gap-3 justify-center items-center flex-col'>
              <div className='flex gap-2 justify-center items-center'>
                <label className='font-bold'>Widget Title</label>
                <input onChange={(e)=>setTitle(e.target.value)} className='border p-1 border-black outline-none rounded-md' type="text" /> 
              </div>
              <div className='flex gap-2 justify-center items-center'>
                <label className='font-bold'>Widget Text</label>
                <input onChange={(e)=>setText(e.target.value)} className='border p-1 border-black outline-none rounded-md' type="text" /> 
              </div>
              <Button onClick={AddtoCategory} variant={'contained'}>Add Widget</Button>              
            </div>
            
            : null
        }
     </div>
    </div>
  )
}

export default AddWidget
