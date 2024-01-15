import { useState, useEffect, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../Contexts/AuthContext';

const useFetchUserData = () => {

  // Initialize state variables for data.
  const [userData, setUserData] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [CPUUserData, setCPUUserData] = useState(null);

  // Access the current user from the authentication context.
  const { currentUser } = useContext(AuthContext);


  useEffect(() => {
    const fetchData = async () => {
      let userList = [];
      try {
        const querySnapshot = await getDocs(collection(db, "users"));

        //create a user list from all the documents on the firsbase collection.
        querySnapshot.forEach((doc) => {
          userList.push({ id: doc.id, ...doc.data() });
        });

        // Find and set the CPU user data if it exists.
        const CPUUserData = userList.find(user => user.firstname === "CPU");
        if (CPUUserData) {
          setCPUUserData(CPUUserData);
        }

        // If a current user is authenticated, find and set their data.
        if (currentUser) {
          const foundUserData = userList.find(user => user.id === currentUser.uid);
          if (foundUserData) {
            setCurrentUserData(foundUserData);
          }
        }
        // Update the user data state with the complete user list.
        setUserData([...userList]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [currentUser]);


  return { userData, CPUUserData, currentUser, currentUserData };
};

export default useFetchUserData;
