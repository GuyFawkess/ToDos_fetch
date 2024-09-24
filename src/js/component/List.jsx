import React from "react";

const List = ({values, children}) => {
    return (
      <>
        {values.map(children)}
      </>
            
        )
}

export default List;