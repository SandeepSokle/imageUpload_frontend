import axios from "axios";
import { firebaseConfig } from "../firebase/firebase";
import { getData } from "../redux/home/action";
const uuid = require("react-uuid");
const {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} = require("firebase/storage");
var firebase = require("firebase/app");

export const getAllData = async (dispatch) => {
  let data = await axios.get(`${process.env.React_App_Api}/images`);
  dispatch(getData(data.data));
};

export const fileUpload = async (props) => {
  const { file, setFile } = props;
  try {
    firebase.initializeApp(firebaseConfig);
    const storageRef = ref(getStorage(), "images/" + uuid() + "_" + file?.name);
    let fileUrl = "";
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        console.log(error);
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFile(downloadURL);
          fileUrl = downloadURL;
        });
      }
    );

    //updateData
    return fileUrl;
  } catch (err) {
    console.log(err);
  }
};
