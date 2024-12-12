import { useFirestore } from '../hooks/useFirestore';

const HomePage = () => {
  const { docs: deals, loading, error } = useFirestore('deals');
};
import { db } from '../config/firebase';
import { collection, query, getDocs } from 'firebase/firestore';

const fetchDeals = async () => {
  try {
    const dealsRef = collection(db, 'deals');
    const q = query(dealsRef);
    const querySnapshot = await getDocs(q);
    const deals = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setDeals(deals);
    setFilteredDeals(deals);
  } catch (error) {
    console.error('Error fetching deals:', error);
  }
};