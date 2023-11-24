
const firebaseConfig = {
    apiKey: "AIzaSyA7Spm2Qw9zM6UxQJPMTicX8QQJTsPm8YI",
    authDomain: "canteenmanage-a8832.firebaseapp.com",
    databaseURL: "https://canteenmanage-a8832-default-rtdb.firebaseio.com",
    projectId: "canteenmanage-a8832",
    storageBucket: "canteenmanage-a8832.appspot.com",
    messagingSenderId: "614326491767",
    appId: "1:614326491767:web:5a65f0859876b44c268472"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  const auth = firebase.auth();
  
  // SignUp Form ID's -
  const myForm = document.getElementById("main-form");
  const googleSignUp = document.querySelectorAll("#google-signUpIn");
  const githubSignUp = document.querySelectorAll("#github-signUpIn");
  const facebookSignUp = document.querySelectorAll("#facebook-signUpIn");
  
  // SignIn Form ID's -
  const signInForm = document.getElementById('signIn-form');
  
  // Sign Up Methods -
  class signUpMethods {
    // Basic LogIn System
    builtInSignUp() {
      const userName = myForm["sign-up-full-name"].value;
      const email = myForm["sign-up-email"].value;
      const password = myForm["sign-up-password"].value;
      const repassword = myForm["sign-up-repassword"].value;
      const phoneNumber = myForm["sign-up-number"].value;
  
      // CheckStuff -
      if (password !== repassword || password === '') {
        Swal.fire('Re-entered password is not the same as the entered password or field is empty');
      } else if (phoneNumber.length !== 10) {
        Swal.fire('Phone Number is not valid');
      } else {
        // Firebase Auth
        auth.createUserWithEmailAndPassword(email, password)
          .then((cred) => {
            // Save Data to Firebase Realtime Database
            saveDatabase.UserfirebaseDatabase(userName, email, password);
            Swal.fire({
              icon: 'success',
              title: 'Account Created Successfully. Please Log In To order Delicious Cuisine',
            });
          })
          .catch((error) => Swal.fire("" + error));
      }
    }
  
    // Google SignUp Method -
    googleSignUpIn() {
      var provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider)
        .then((result) => {
          console.log(result.user.email);
          this.notifyUser();
          this.firebaseAuthRedirect();
        })
        .catch((error) => Swal.fire("" + error));
    }
  
    // FaceBook SignUp Method -
    facebookSignUpIn() {
      var provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope("email, user_birthday");
  
      auth.signInWithPopup(provider)
        .then((result) => {
          this.notifyUser();
          this.firebaseAuthRedirect();
        })
        .catch((error) => Swal.fire("" + error));
    }
  
    // GitHub SignUp Method -
    githubSignUpIn() {
      var provider = new firebase.auth.GithubAuthProvider();
      provider.addScope("email, password");
  
      auth.signInWithPopup(provider)
        .then((result) => {
          this.notifyUser();
          this.firebaseAuthRedirect();
        })
        .catch((error) => Swal.fire("" + error));
    }
  
    static authRedirecting() {
      window.setTimeout(() => {
        window.location.replace('C:\Users\praval kukreti\OneDrive\Desktop\Book Store Website Part 3\index.html');
      }, 500);
    }
  
    // Notify User
    notifyUser() {
      window.setTimeout(function () {
        Swal.fire({
          icon: 'success',
          title: 'Account Signed In Successfully',
        });
      }, 1250);
    }
  
    firebaseAuthRedirect() {
      firebase.auth().onAuthStateChanged(function (user) {
        // If user is registered -
        user ? window.location.replace('C:\Users\praval kukreti\OneDrive\Desktop\Book Store Website Part 3\index.html') : console.log('none');
      });
    }
  }
  
  // Sign In Methods -
  class signInMethods {
    builtInSignIn() {
      const email = document.getElementById('sign-in-email').value;
      const password = document.getElementById('sign-in-password').value;
      console.log('called');
  
      auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          Swal.fire({
            icon: 'success',
            title: 'Logged In',
          });
          signUpMethods.authRedirecting();
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: '' + error,
          });
        });
    }
  }
  
  // Save Data - To Firebase
  class saveDatabase {
    // Authentication Details -
    static UserfirebaseDatabase(userName, email, password, phoneNumber) {
      const userID = makeUserDataID(email);
      // Create User data in Firebase Realtime Database
      console.log('database called');
      database.ref('User_Data/' + userID).set({
        User_Name: userName,
        Email: email,
        Password: password,
        Phone_Number: phoneNumber,
      });
    }
  
    // Cart Details
  }
  
  // When HTML & Other code is done -
  document.addEventListener("DOMContentLoaded", () => {
    // Sign Up Methods -
    const signUp = new signUpMethods();
  
    // Main Sign Up Form
    if (myForm) {
      myForm.addEventListener("submit", (e) => {
        e.preventDefault();
        signUp.builtInSignUp();
      });
    }
  
    // Google Sign Up Form
    if (googleSignUp) {
      googleSignUp.forEach(element => {
        element.addEventListener("click", (e) => {
          e.preventDefault();
          signUp.googleSignUpIn();
        });
      });
    }
  
    // GitHub Sign Up Form
    if (githubSignUp) {
      githubSignUp.forEach(element => {
        element.addEventListener("click", (e) => {
          e.preventDefault();
          signUp.githubSignUpIn();
        });
      });
    }
  
    // Facebook Sign Up Form
    if (facebookSignUp) {
      facebookSignUp.forEach(element => {
        element.addEventListener("click", (e) => {
          e.preventDefault();
          signUp.facebookSignUpIn();
        });
      });
    }
  
    // Sign In Methods -
    const signIn = new signInMethods();
    if (signInForm) {
      // Main Sign In Form
      signInForm.addEventListener("submit", (e) => {
        e.preventDefault();
        signIn.builtInSignIn();
      });
    }
  
    // LogOut User -
    const logout = document.querySelectorAll('#userlogout');
    if (logout) {
      logout.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          Swal.fire({
            icon: 'success',
            title: 'Logged Out Successfully',
          });
          firebase.auth().signOut().then(() => {
            window.location.replace("C:/Users/ASUS/Downloads/mit-canteen-site-master/mit-canteen-site-master/index.html");
          });
        });
      });
    }
  });
  
  // Makes User ID Through EmailID Provided By User
  function makeUserDataID(userEmailID) {
    let userDataID = '';
    for (let i = 0; i < userEmailID.length; i++) {
      if (userEmailID[i] !== '@') {
        userDataID = userDataID + userEmailID[i];
      } else {
        break;
      }
    }
    return userDataID;
  }
  