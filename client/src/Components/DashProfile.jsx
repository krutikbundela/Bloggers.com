import { useSelector, useDispatch } from "react-redux";
import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/userSlice";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  // console.log("DashProfile ~ currentUser:", currentUser._id);

  const dispatch = useDispatch();

  const [imageFile, setImageFile] = useState(null);

  //Temporary File Url Created By JS Func.
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);

  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserErrror, setUpdateUserErrror] = useState(null);

  const filePickerRef = useRef();

  const [formData, setFormData] = useState({});
  // console.log("DashProfile ~ formData:", formData);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("handleImageChange ~ file:", file);
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file)); //create tempFile Url
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    /*
    service firebase.storage {
        match /b/{bucket}/o {
          match /{allPaths=**} {
           allow read;
            allow write:if
      request.resource.size <2 *1024* 1024 &&
      request.resource.contentType.matches('image/.*')
    }
  }
}*/

    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app); // app is for authentication for firebase that correct person is requesting for upload image
    const fileName = new Date().getTime() + imageFile.name; //imageFile Will Have Various Data OF Image But For now With .name we can get name
    const storageRef = ref(storage, fileName); // it will save with this file name to storage
    //Getting Data While It Is Uploading
    const uploadTask = uploadBytesResumable(storageRef, imageFile); // this will take that image and will store to storage with storageRef.filename name

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          `Could not upload image (File must be less than 2MB)`
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        //get URL of Uploaded File
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(true);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); //Defaultly When We Save Form The Form Will Submit with load to prevent that......
    if (Object.keys(formData).length === 0) {
      setUpdateUserErrror("No Changes Made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserErrror("Please Wait For Image To Upload");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserErrror(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's Profile Updated Successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserErrror(error.message);
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto p-3 w-full">
        <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
        <form
          action=""
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-4"
        >
          <input
            type="file"
            accept="image/*" //  /* means any types of image
            onClick={handleImageChange}
            ref={filePickerRef}
            hidden
          />
          <div
            className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
            // when we click on this div uppr nu input:file call thse
            onClick={() => filePickerRef.current.click()}
          >
            {imageFileUploadProgress && (
              <CircularProgressbar
                value={imageFileUploadProgress || 0}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(62, 152, 199, ${
                      imageFileUploadProgress / 100
                    })`,
                  },
                }}
              />
            )}
            <img
              src={imageFileUrl || currentUser.profilePicture}
              alt="user"
              className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
                imageFileUploadProgress &&
                imageFileUploadProgress < 100 &&
                "opacity-60"
              }`}
            />
          </div>
          {imageFileUploadError && (
            <Alert color="failure"> {imageFileUploadError}</Alert>
          )}

          <TextInput
            type="text"
            id="username"
            placeholder="Username"
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
          <TextInput
            type="text"
            id="email"
            placeholder="email"
            defaultValue={currentUser.email}
            onChange={handleChange}
          />
          <TextInput
            type="text"
            id="password"
            placeholder="password"
            onChange={handleChange}
          />

          <Button type="submit" gradientDuoTone={`purpleToBlue`} outline>
            Update
          </Button>
        </form>
        <div className="text-red-500 flex justify-between mt-5">
          <span className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer">Sign Out</span>
        </div>
        {updateUserSuccess && (
          <Alert color="success" className="mt-5">
            {updateUserSuccess}
          </Alert>
        )}
        {updateUserErrror && (
          <Alert color="failure" className="mt-5">
            {updateUserErrror}
          </Alert>
        )}
      </div>
    </>
  );
}
