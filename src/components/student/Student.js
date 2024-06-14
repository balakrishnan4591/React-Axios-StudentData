import { useState, useEffect } from "react";
import axios from "axios";
import { useStudent } from "../../Context";
import { Modal } from "bootstrap";
import "./Student.css";
import { HiEye, HiPencil, HiTrash } from "react-icons/hi";
import { FcFlashOn } from "react-icons/fc";

const API_URL = "https://666c94f149dbc5d7145e8424.mockapi.io/student"; //Mock API

const Student = () => {
  const {
    students,
    setStudents,
    studentName,
    setStudentName,
    email,
    setEmail,
    address,
    setAddress,
    city,
    setCity,
    state,
    setState,
    zip,
    setZip,
    selectedStudent,
    setSelectedStudent,
    inputState,
    setInputState,
    actionTitle,
    setActionTitle,
  } = useStudent();

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    const response = await axios(API_URL);
    // const students = await response.json();
    setStudents(response.data);
  };

  // remove -start
  //add new student
  const addStudent = async (name) => {
    // setActionTitle("Add Student Details");
    // setInputState(false);
    setStudentName("");
    setEmail("");
    setAddress("");
    setCity("");
    setState("");
    setZip("");
    // console.log(name);
    const newStudent = {
      name: name,
      email: email,
      address: address,
      city: city,
      state: state,
      zip: zip,
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent),
    });

    // get newly created student from the response
    const student = await response.json();
    //we are updateing the student list with the newly added list
    setStudents([...students, student]);
  };

  // remove-end

  const deleteStudent = async (id) => {
    //send delete request to the API
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setStudents(students.filter((student) => student.id !== id));
  };

  const editStudent = (student) => {
    // setVisible(true);
    setActionTitle("Edit Student Details");
    setInputState(false);
    setSelectedStudent(student);
    setStudentName(student.name);
    setEmail(student.email);
    setAddress(student.address);
    setCity(student.city);
    setState(student.state);
    setZip(student.zip);
  };

  const viewStudent = (student) => {
    // setVisible(true);
    setActionTitle("View Student Details");
    setInputState(true);
    setSelectedStudent(student);
    setStudentName(student.name);
    setEmail(student.email);
    setAddress(student.address);
    setCity(student.city);
    setState(student.state);
    setZip(student.zip);
  };

  // remove -start
  const updateStudent = async () => {
    const updatedStudent = {
      ...selectedStudent,
      name: studentName,
      email: email,
      address: address,
      city: city,
      state: state,
      zip: zip,
    };

    await fetch(`${API_URL}/${selectedStudent.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStudent),
    });
    setStudents(
      students.map((student) =>
        student.id === selectedStudent.id ? updatedStudent : student
      )
    );
    setSelectedStudent(null);
    setStudentName("");
    setEmail("");
    setAddress("");
    setCity("");
    setState("");
    setZip("");
    setActionTitle("Add Student Details");
  };

  const handleSubmit = (e) => {
    //console.log("inside submit");
    e.preventDefault();
    if (!selectedStudent) {
      // setActionTitle("Add Student Details");
      addStudent(studentName);
    } else {
      updateStudent();
      setStudentName("");
      setEmail("");
      setAddress("");
      setCity("");
      setState("");
      setZip("");
    }
  };
  // remove -end

  return (
    <>
      <div className="row" id="body-container">
        {/* table start */}
        <div className="col-md-4">
          <div className="row" id="body-img">
            <img
              className="img-fluid"
              title="Add Student"
              data-bs-toggle="modal"
              data-bs-target="#studentModal"
              // src="https://static.vecteezy.com/system/resources/thumbnails/021/352/965/small_2x/user-icon-person-profile-avatar-with-plus-symbol-add-user-profile-icon-png.png"
              src="https://icons.veryicon.com/png/o/brands/linear-icon-29/add-user-20.png"
            />
            {/* <span class="img-fluid">Add user</span> */}
          </div>

          <div className="row">
            <div className="card">
              <div className="card-header">
                <strong>Quick Guide</strong>
              </div>
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <p>
                    Click above <strong>Add Student</strong> icon to add a new
                    Student.
                  </p>
                  <ul>
                    <li>
                      <FcFlashOn /> Click <strong>View</strong> icon(
                      <HiEye />) to view selected students details
                    </li>
                    <li>
                      <FcFlashOn /> Click <strong>Edit</strong> icon(
                      <HiPencil />) to make any changes to selected student
                      details
                    </li>
                    <li>
                      <FcFlashOn /> Click <strong>Delete</strong> icon(
                      <HiTrash />) to remove the student from Mock API
                    </li>
                  </ul>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-7" id="content-body">
          {/* bootstrap Modal -start */}
          <h1 className="list-title">Student List</h1>
          <div
            className="modal fade"
            id="studentModal"
            tabindex="-1"
            aria-labelledby="studentModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="modal-header">
                    <h5 className="modal-title">{actionTitle}</h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => {
                        setStudentName("");
                        setEmail("");
                        setAddress("");
                        setCity("");
                        setState("");
                        setZip("");
                        setSelectedStudent(null);
                        setActionTitle("Add Student Details");
                        setInputState(false);
                      }}
                    ></button>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-row">
                      <br />
                      <div className="form-group col-md-6">
                        <label for="inputName">Name</label>
                        <input
                          className="form-control"
                          type="text"
                          id="inputName"
                          disabled={inputState}
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          placeholder="Enter the Student Name"
                          required
                        />
                      </div>
                      {/* <br /> */}
                      <div className="form-group col-md-6">
                        <label for="inputEmail">Email</label>
                        <input
                          className="form-control"
                          type="email"
                          id="inputEmail"
                          disabled={inputState}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter the Student Email"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label for="inputAddress">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        disabled={inputState}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="1234 Main St"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group ">
                        <label for="inputCity">City</label>
                        <input
                          type="text"
                          className="form-control"
                          disabled={inputState}
                          id="inputCity"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                      <div className="form-group ">
                        <label for="inputState">State</label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputState"
                          disabled={inputState}
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        />
                      </div>
                      <div className="form-group ">
                        <label for="inputZip">Zip</label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputZip"
                          disabled={inputState}
                          value={zip}
                          onChange={(e) => setZip(e.target.value)}
                        />
                      </div>
                    </div>

                    <br />

                    <div className="modal-footer">
                      <button
                        type="submit"
                        className="btn btn-warning"
                        disabled={inputState}
                        data-bs-dismiss="modal"
                      >
                        {selectedStudent ? "Update" : "Add"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* bootstrap Modal -end */}
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email ID</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <>
                    {/* <br /> */}
                    <tr>
                      <th scope="row" key={student.id}>
                        {student.id}
                      </th>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>
                        <button
                          id="btn-action"
                          type="submit"
                          title="View"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#studentModal"
                          onClick={() => viewStudent(student)}
                        >
                          <HiEye />
                        </button>
                        <button
                          id="btn-action"
                          type="submit"
                          title="Edit"
                          className="btn btn-warning"
                          data-bs-toggle="modal"
                          data-bs-target="#studentModal"
                          onClick={() => editStudent(student)}
                        >
                          <HiPencil />
                        </button>
                        <button
                          id="btn-action"
                          type="button"
                          title="Delete"
                          className="btn btn-danger"
                          onClick={() => deleteStudent(student.id)}
                        >
                          <HiTrash />
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          {/* table end */}
        </div>
      </div>
    </>
  );
};
export default Student;
