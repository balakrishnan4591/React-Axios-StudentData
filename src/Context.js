import { createContext, useContext, useState } from "react";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [inputState, setInputState] = useState(false);
  const [actionTitle, setActionTitle] = useState("Add Student Details");
  return (
    <StudentContext.Provider
      value={{
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
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  return useContext(StudentContext);
};
