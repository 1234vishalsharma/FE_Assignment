import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeWidget } from "../store/reducers/categoryReducer";

const WidgetList = () => {
  const categories = useSelector((state) => state.categoryReducer.categories);
  const dispatch = useDispatch();
  const [widget , setWidget] = useState([]);

  const handelChange = (eventvalue, wid, cid) => {
    if(eventvalue === false){
      setWidget(prev => [...prev , {cid , wid , eventvalue}]);
    }else{
      const newWidget = widget.filter((ele) => ele.cid !== cid &&  ele.wid !== wid);
      setWidget(newWidget);
    }
  }

  const handelClose = () => {
    if(widget){
      widget.forEach((data)=>{
        dispatch(removeWidget({cid :data.cid , wid : data.wid}));
      })
    }
    setWidget([]);
  }

  return (
    <div className="flex flex-col gap-3">
      {categories.map((category) => {
        return (
          <div className="flex flex-col">
            <h4>{category.name}</h4>

            {category.widgets.map((element) => {
              return (
                <div className=" m-2 flex gap-3 border border-gray-300 p-2 rounded-md">
                  <label className="flex items-center">
                    <input
                      defaultChecked = {true}
                      onChange={(event) =>
                        handelChange(event.target.checked, element.wid, category.id)
                      }
                      type="checkbox"
                      className="form-checkbox h-5 w-5"
                    />
                    <span className="ml-2 text-gray-700">{element.wname}</span>
                  </label>
                </div>
              );
            })}
          </div>
        );
      })}


        <div className="flex justify-end mt-8">
          <button
            onClick={handelClose}
            className="px-4 py-2 mr-4 absolute bottom-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
    </div>
  );
};

export default WidgetList;
