// src/utils/userAuth.js
import { db } from '../config/firebase';
import { 
   getAuth, 
   createUserWithEmailAndPassword, 
   signInWithEmailAndPassword,
   signOut,
   sendPasswordResetEmail,
   updatePassword,
   GoogleAuthProvider,
   signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

export const UserAuth = {
   auth: getAuth(),
   googleProvider: new GoogleAuthProvider(),

   async register(email, password, userData) {
       try {
           const userCredential = await createUserWithEmailAndPassword(
               this.auth,
               email,
               password
           );

           await this.createUserProfile(userCredential.user.uid, {
               email,
               ...userData,
               role: 'user'
           });

           return userCredential.user;
       } catch (error) {
           throw this.handleAuthError(error);
       }
   },

   async login(email, password) {
       try {
           const userCredential = await signInWithEmailAndPassword(
               this.auth,
               email,
               password
           );
           
           await this.updateLoginTimestamp(userCredential.user.uid);
           return userCredential.user;
       } catch (error) {
           throw this.handleAuthError(error);
       }
   },

   async googleSignIn() {
       try {
           const result = await signInWithPopup(this.auth, this.googleProvider);
           const isNewUser = result._tokenResponse.isNewUser;

           if (isNewUser) {
               await this.createUserProfile(result.user.uid, {
                   email: result.user.email,
                   displayName: result.user.displayName,
                   photoURL: result.user.photoURL,
                   role: 'user'
               });
           }

           return result.user;
       } catch (error) {
           throw this.handleAuthError(error);
       }
   },

   async logout() {
       try {
           await signOut(this.auth);
       } catch (error) {
           throw this.handleAuthError(error);
       }
   },
async createUserProfile(uid, userData) {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        isActive: true
    });
},

async updateLoginTimestamp(uid) {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
        lastLogin: serverTimestamp()
    });
},

async resetPassword(email) {
    try {
        await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
        throw this.handleAuthError(error);
    }
},

async changePassword(newPassword) {
    try {
        const user = this.auth.currentUser;
        if (!user) throw new Error('No user logged in');
        await updatePassword(user, newPassword);
    } catch (error) {
        throw this.handleAuthError(error);
    }
},

async getUserRole(uid) {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    return userDoc.exists() ? userDoc.data().role : null;
},

async checkPermission(uid, requiredRole) {
    const userRole = await this.getUserRole(uid);
    const roleHierarchy = {
        'superadmin': 3,
        'admin': 2,
        'moderator': 1,
        'user': 0
    };

    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
},

handleAuthError(error) {
    const errorMessages = {
        'auth/email-already-in-use': 'Email is already registered',
        'auth/invalid-email': 'Invalid email address',
        'auth/operation-not-allowed': 'Operation not allowed',
        'auth/weak-password': 'Password is too weak',
        'auth/user-disabled': 'User account has been disabled',
        'auth/user-not-found': 'User not found',
        'auth/wrong-password': 'Incorrect password',
        'auth/invalid-credential': 'Invalid credentials',
        'auth/too-many-requests': 'Too many attempts. Please try again later'
    };

    return new Error(errorMessages[error.code] || error.message);
},

// Authorization middleware for React components
withAuth(Component, requiredRole = null) {
    return function AuthenticatedComponent(props) {
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const navigate = useNavigate();

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                if (!user) {
                    navigate('/login');
                    return;
                }

                if (requiredRole) {
                    try {
                        const hasPermission = await checkPermission(user.uid, requiredRole);
                        if (!hasPermission) {
                            setError('Insufficient permissions');
                            navigate('/unauthorized');
                            return;
                        }
                    } catch (error) {
                        setError(error.message);
                    }
                }

                setLoading(false);
            });

            return () => unsubscribe();
        }, []);

        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;

        return <Component {...props} />;
    };
}
};

export default UserAuth;