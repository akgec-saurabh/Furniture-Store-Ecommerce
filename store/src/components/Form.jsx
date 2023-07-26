import React from "react";
function Form() {
  const onSubmitHandler = () => {};
  return (
    <form onSubmit={onSubmitHandler} className="form">
      {/* <div className="form_review"></div> */}

      <div className="review_wrapper">
        <label htmlFor="review">Review *</label>
        <textarea name="review" id="review" cols="100%" rows="10"></textarea>
      </div>

      <div className="detail">
        <div className="name_wrapper">
          <label htmlFor="name">Name *</label>
          <input type="text" id="name" name="name" />
        </div>
        <div className="email_wrapper">
          <label htmlFor="email">Email *</label>
          <input type="text" id="email" name="email" />
        </div>
      </div>
      <div className="form_btn">
        <button className="btn">Submit</button>
      </div>
    </form>
  );
}

export default Form;
