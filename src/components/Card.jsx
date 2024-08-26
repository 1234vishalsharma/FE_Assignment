import React from 'react'
import {useDispatch} from 'react-redux';
import { removeWidget } from '../store/reducers/categoryReducer';

const Card = (props) => {
  const dispatch = useDispatch();
  const onClose = () => {
    const data = {cid:props.cid , wid:props.wid};
    dispatch(removeWidget(data))
  }
    return (
    <div className='flex flex-col gap-4 p-2 h-56 w-96 rounded-xl bg-white overflow-hidden'>
      <div className='flex justify-between'>
        <h3 className='font-semibold ml-4'>{props.title}</h3>
          <button onClick={onClose} className="text-lg font-bold mr-4 h-8 flex items-center justify-center w-8 hover:bg-slate-200 rounded-full">
            &times;
          </button>
      </div>
      <img className='h-28 w-full flex items-center' src="./graph.svg" alt="Loading..." />
      <span className='text-center'>{props.text}</span>
    </div>
  )
}

export default Card
