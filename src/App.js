
import './App.css';
import Footer from './components/common/Footer';
import UploadNotes from './components/teacher/UploadNotes';
import ExamResult from './components/teacher/ExamResult';
import AttendanceForm from './components/teacher/AttendanceForm';
import AssignmentForm from './components/teacher/AssignmentForm';
function App() {
  const handleFormSubmit = (data) => {
    // Send the data to your server or perform necessary actions
    console.log('Exam Result Data:', data);
  };
  const handleFormsubmit1 = (data)=>{
    console.log('Attandance data : ', data);
  }
  const studentName = "anurag";
  const rollNumber ="101";
  return (
    <div className="container">
      <UploadNotes />
      <ExamResult onSubmit={handleFormSubmit} /> 
      <AttendanceForm studentName={studentName} rollNumber={rollNumber} onSubmit={handleFormsubmit1} />
      <AssignmentForm />
      <Footer />
  
      
    </div>
  );
}

export default App;
