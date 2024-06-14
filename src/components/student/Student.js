import { useState, useEffect } from "react";
import axios from "axios";
import { useStudent } from "../../Context";
import { Modal } from "bootstrap";
import "./Student.css";
import { HiPencil, HiTrash } from "react-icons/hi";

const API_URL = "https://666c94f149dbc5d7145e8424.mockapi.io/student"; //Mock API

const Student = () => {
  const {
    students,
    setStudents,
    studentName,
    setStudentName,
    email,
    setEmail,
    selectedStudent,
    setSelectedStudent,
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
    setStudentName("");
    setEmail("");
    console.log(name);
    const newStudent = { name: name, email: email };

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
    setSelectedStudent(student);
    setStudentName(student.name);
    setEmail(student.email);
  };

  // remove -start
  const updateStudent = async () => {
    const updatedStudent = {
      ...selectedStudent,
      name: studentName,
      email: email,
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
  };

  const handleSubmit = (e) => {
    console.log("inside submit");
    e.preventDefault();
    if (!selectedStudent) {
      addStudent(studentName);
    } else {
      updateStudent();
      setStudentName("");
      setEmail("");
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
              class="img-fluid"
              title="Add Student"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              // src="https://static.vecteezy.com/system/resources/thumbnails/021/352/965/small_2x/user-icon-person-profile-avatar-with-plus-symbol-add-user-profile-icon-png.png"
              src="https://icons.veryicon.com/png/o/brands/linear-icon-29/add-user-20.png"
            />
            {/* <span class="img-fluid">Add user</span> */}
          </div>

          <div className="row">
            <div class="card">
              <div class="card-header">Quote</div>
              <div class="card-body">
                <blockquote class="blockquote mb-0">
                  <p>Click above icon to add a NEW Student Entry.</p>
                  <footer class="blockquote-footer">
                    Someone famous in{" "}
                    <cite title="Source Title">Source Title</cite>
                  </footer>
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
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="modal-header">
                    <h5 class="modal-title">
                      {selectedStudent ? "Update Student" : "Add Student"}
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => {
                        setStudentName("");
                        setEmail("");
                        setSelectedStudent(null);
                      }}
                    ></button>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <input
                      class="form-control"
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Enter the Student Name"
                      required
                    />
                    <br />
                    <input
                      class="form-control"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter the Student Email"
                      required
                    />

                    <div class="modal-footer">
                      <button
                        type="submit"
                        class="btn btn-warning"
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
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Student Name</th>
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
                          title="Edit"
                          class="btn btn-warning"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => editStudent(student)}
                        >
                          <HiPencil />
                        </button>
                        <button
                          id="btn-action"
                          type="button"
                          title="Delete"
                          class="btn btn-danger"
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
