import { createContext, useContext, useState } from "react";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  return (
    <StudentContext.Provider
      value={{
        students,
        setStudents,
        studentName,
        setStudentName,
        email,
        setEmail,
        selectedStudent,
        setSelectedStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  return useContext(StudentContext);
};
