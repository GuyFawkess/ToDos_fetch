import React from "react";

const List = (props) => {
    return (
      <>
      <ul className="m-auto">
        {props.values.map(props.children)}
      </ul>
      </>
            
        )
}

export default List;