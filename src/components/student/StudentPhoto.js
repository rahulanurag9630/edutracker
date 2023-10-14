// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// function StudentPhoto() {
//   const [photoName, setPhotoName] = useState(null);
//   const studentId = '6511130a8a83bdcb7e8c1af6';
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/students/fetcheStudent/${studentId}`, {
//           headers: {
//             'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50Ijp7ImlkIjoiNjUyOTc4OTUwNjEzZmQxYWQxYjc4MmZiIn0sImlhdCI6MTY5NzIxNjY2Mn0.03jlAjNQAdQpI7vZopSIzmsGK--7Jb29TS0GtOg9TDA', // Replace with your actual auth token
//           },
//         });

//         // Assuming the API response contains the photo name as a string
//         setPhotoName(response.data);
        
//       } catch (error) {
//         console.error(error);
//         // Handle errors here
//       }
//     };

//     fetchData();
//   }, [studentId]); // Trigger the effect when studentId changes

//   return (
//     <div>
//       {photoName ? (
//         <img
//           src={`http://localhost:5000/uploads/${photoName}`} // Replace with your actual uploads directory path
//           alt="Student"
//           style={{ width: '200px', height: '200px' }}
//         />
//       ) : (
//         <p>No photo found for this student.{photoName}</p>
//       )}
//     </div>
//   );
// }

// export default StudentPhoto;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentPhoto() {
  const [photoName, setPhotoName] = useState(null);
  const studentId = '6511130a8a83bdcb7e8c1af6';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/students/fetcheStudent/${studentId}`, {
          headers: {
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50Ijp7ImlkIjoiNjUyOTc4OTUwNjEzZmQxYWQxYjc4MmZiIn0sImlhdCI6MTY5NzIxNjY2Mn0.03jlAjNQAdQpI7vZopSIzmsGK--7Jb29TS0GtOg9TDA', // Replace with your actual auth token
          },
        });

        setPhotoName(response.data);
      } catch (error) {
        console.error(error);
        // Handle errors here
      }
    };

    fetchData();
  }, [studentId]);

  return (
    <div>
      {photoName ? (
        <img
          src={`http://localhost:5000/uploads/${photoName}`}
          alt="Student"
          style={{ width: '400px', height: '400px' }}
        />
      ) : (
        <p>No photo found for this student.</p>
      )}
    </div>
  );
}

export default StudentPhoto;
