import React from 'react';

 import student from '../../assets/student.css';

function ParentReg() {
    return(
<div className="container mt-3">
  <form>
    <div className="row jumbotron box8">
      <div className="col-sm-12 mx-t3 mb-4">
        <h2 className="text-center text-info">Parent Registration Form</h2>
      </div>
      <div className="col-sm-6 form-group">
        <label for="name-f">First Name</label>
        <input type="text" className="form-control" name="fname" id="name-f" placeholder="Enter your first name." required/>
      </div>
      <div className="col-sm-6 form-group">
        <label for="name-l">Last Name</label>
        <input type="text" className="form-control" name="lname" id="name-l" placeholder="Enter your last name." required/>
      </div>
      <div className="col-sm-6 form-group">
        <label for="email">Email</label>
        <input type="email" className="form-control" name="email" id="email" placeholder="Enter your email." required/>
      </div>
      <div className="col-sm-4 form-group">
        <label for="tel">Contact Number</label>
        <input type="tel" name="phone" className="form-control" id="tel" placeholder="Enter Your Contact Number." required/>
      </div>
      <div className="col-sm-6 form-group">
        <label for="address-1">Address </label>
        <input type="address" className="form-control" name="Locality" id="address-1" placeholder="Enter your address" required/>
      </div>

      <div className="col-sm-6 form-group">
        <label for="relation">Relation With Student </label>
        <input type="text" className="form-control" name="Locality" id="relation" placeholder="Enter relation with student" required/>
      </div>
      
      <div className="col-sm-6 form-group">
        <label for="pass">Password</label>
        <input type="Password" name="password" className="form-control" id="pass" placeholder="Enter your password." required/>
      </div>
      <div className="col-sm-6 form-group" >
        <label for="pass2">Confirm Password</label>
        <input type="Password" name="cnf-password" className="form-control" id="pass2" placeholder="Re-enter your password." required/>
      </div>
      
      <div className="col-sm-6 form-group">
        <label for="sex">Gender</label>
        <select id="sex" className="form-control browser-default custom-select">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">other</option>
        </select>
      </div>
      
      <div className="col-sm-12 form-group mb-0">
        <button className="btn btn-denger float-right" id='b' type='submit'>Submit</button>
      </div>

    </div>
  </form>
</div>
  );
}

export default ParentReg;
