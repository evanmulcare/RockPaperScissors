import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import useFetchUserData from './useFetchUserData';

const useUpdateScore = () => {
  const { currentUser, currentUserData, CPUUserData } = useFetchUserData();

  const updateScores = async (scoreToAddCurrentUser, scoreToAddCPU) => {
    // Check if there is no current user or user data available to update.
    if (!currentUser || !currentUserData) {
      console.error("No user data available to update.");
      return;
    }

    try {
      // Create a document reference for the current user's data.
      const currentUserDocRef = doc(db, 'users', currentUser.uid);
      const currentUserDoc = await getDoc(currentUserDocRef);

      // Get the current score of the current user.
      const currentCurrentUserScore = currentUserDoc.data().score;

      // Calculate the new score for the current user.
      let newCurrentUserScore = currentCurrentUserScore + scoreToAddCurrentUser;

      // Update the current user's score in Firestore.
      await updateDoc(currentUserDocRef, { score: newCurrentUserScore });

      // Check if there is CPU user data available.
      if (CPUUserData) {
        // Create a document reference for the CPU user's data.
        const CPUDocRef = doc(db, 'users', CPUUserData.id);
        const CPUDoc = await getDoc(CPUDocRef);

        // Get the current score of the CPU user.
        const currentCPUScore = CPUDoc.data().score;

        // Calculate the new score for the CPU user.
        let newCPUScore = currentCPUScore + scoreToAddCPU;

        // Update the CPU user's score in Firestore.
        await updateDoc(CPUDocRef, { score: newCPUScore });
      }
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  return { updateScores };
};

export default useUpdateScore;
