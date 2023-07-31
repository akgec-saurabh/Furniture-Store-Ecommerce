import React, { useEffect, useRef, useState } from "react";

function DropDown({ head, item }) {
  const [isHover, setIsHover] = useState(false);
  const headRef = useRef(null);

  useEffect(() => {
    const mouseEnterHandler = () => {
      setIsHover(true);
    };
    const mouseLeaveHandler = () => {
      setIsHover(false);
    };

    headRef.current.addEventListener("mouseenter", mouseEnterHandler);

    headRef.current.addEventListener("mouseleave", mouseLeaveHandler);

    return () => {
      headRef.current &&
        headRef.current.removeEventListener("mouseenter", mouseEnterHandler);

      headRef.current &&
        headRef.current.removeEventListener("mouseleave", mouseLeaveHandler);
    };
  }, []);

  return (
    <div ref={headRef} className="dropDown">
      <div className="dropDown_head">{head}</div>
      {item[0].children && isHover && (
        <div className="dropDown_container">
          {item.map((mainItem) => {
            {
              return (
                <div key={mainItem.key} className="dropDown_subContainer">
                  <div className="dropDown_subHead">{mainItem.text}</div>
                  {mainItem.children &&
                    mainItem.children.map((item) => (
                      <div key={item.key} className="dropDown_subItem">
                        {item.text}
                      </div>
                    ))}
                </div>
              );
            }
          })}
        </div>
      )}
      {!item[0].children && isHover && (
        <div className="itemContainer">
          {item.map((item) => (
            <div key={item.key} className="dropDown_subItem">
              {item.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropDown;
