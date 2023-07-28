import React from "react";

const DropDown = ({ name, item }) => {
  return (
    <div className="dropdown_container">
      <div className="dropdown_head">{name}</div>
      <div className="dropdown_drop">
        {item[0].children &&
          item.map((head) => (
            <div key={head.key} className="dropdown_drop_container">
              {<div className={"dropdown_drop_head"}>{head.text}</div>}
              {head.children.map((item) => (
                <div key={item.key} className="dropdown_drop_item">
                  {item.text}
                </div>
              ))}
            </div>
          ))}

        {!item[0].children && (
          <div className="dropdown_drop_container">
            {item.map((item) => (
              <div key={item.key} className="dropdown_drop_item">
                {item.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;
