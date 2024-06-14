import { useStudent } from "../../Context";
import { Modal } from "bootstrap";

const API_URL = "https://666b44f17013419182d2ddde.mockapi.io/studentdata"; //Mock API

const CreateStudent = () => {
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

  //add new student
  const addStudent = async (name) => {
    const newStudent = { name: name, email: email };
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent),
    });

    //get newly created student from the response
    const student = await response.json();
    //we are updateing the student list with the newly added list
    setStudents([...students, student]);
  };

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
    e.preventDefault();
    if (!selectedStudent) {
      addStudent(studentName);
    } else {
      updateStudent();
      setStudentName("");
      setEmail("");
    }
  };

  return (
    <>
      <div class="row">
        <img
          // class="img-fluid"
          style={{ width: "100px", height: "100px" }}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          src="https://static.vecteezy.com/system/resources/thumbnails/021/352/965/small_2x/user-icon-person-profile-avatar-with-plus-symbol-add-user-profile-icon-png.png"
        />
      </div>

      {/* bootstrap Modal -start */}

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
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setStudentName("");
                    setEmail("");
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
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter the Student Email"
                  required
                />

                <div class="modal-footer">
                  <button
                    type="submit"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    {selectedStudent ? "Update Student" : "Add Student"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* bootstrap Modal -end */}
    </>
  );
};

export default CreateStudent;
