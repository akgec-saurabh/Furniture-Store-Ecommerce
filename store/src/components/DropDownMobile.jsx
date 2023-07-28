import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";

function DropDownMobile({ name, item }) {
  const [isHeadOpen, setIsHeadOpen] = useState(false);
  const [isSubHeadOpen, setIsSubHeadOpen] = useState(false);

  const onHeadClickHandler = () => {
    setIsHeadOpen((prv) => !prv);
  };

  const onSubHeadClickHandler = () => {
    setIsSubHeadOpen((prv) => !prv);
  };
  return (
    <div className="dropdownMobile">
      <div className="dm_head" onClick={onHeadClickHandler}>
        {name} {!isHeadOpen && <PlusOutlined />}
        {isHeadOpen && <MinusOutlined />}
      </div>
      {isHeadOpen && (
        <div className="dm_drop">
          {item[0].children &&
            item.map((head) => (
              <div key={head.key} className="dm_drop_container">
                {
                  <div
                    onClick={onSubHeadClickHandler}
                    className={"dm_drop_head"}
                  >
                    {head.text}
                    {!isSubHeadOpen && <PlusOutlined />}
                    {isSubHeadOpen && <MinusOutlined />}
                  </div>
                }
                {isSubHeadOpen &&
                  head.children.map((item) => {
                    console.log(item);
                    return (
                      <div key={item.key} className="dm_drop_item">
                        {item.text}
                      </div>
                    );
                  })}
              </div>
            ))}

          {!item[0].children && (
            <div className="dm_drop_container">
              {item.map((item) => (
                <div key={item.key} className="dm_drop_item">
                  {item.text}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DropDownMobile;
