import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
type props = {
  file: File;
  storagePath: string;
  getProgress?: (progress: number) => void;
  onError?: (error: string) => void;
  onSuccess?: (url: string) => void;
};
export function UploadFile({
  file,
  getProgress,
  onError,
  onSuccess,
  storagePath,
}: props) {
  const storage = getStorage();
  const storageRef = ref(storage, storagePath + "/" + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      getProgress && getProgress(progress);
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
      onError && onError(error.code);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        onSuccess && onSuccess(downloadURL);
      });
    }
  );
}
export function deleteFile(
  filePath: string,
  onSuccess?: () => void,
  onError?: (error: string) => void
) {
  const storage = getStorage();
  const desertRef = ref(storage, filePath);

  deleteObject(desertRef)
    .then(() => {
      onSuccess && onSuccess();
    })
    .catch((error) => {
      onError && onError(error.code);
    });
}

export function getFilePathFromURL(url: string) {
  const baseUrl =
    "https://firebasestorage.googleapis.com/v0/b/zyvo-webapp.appspot.com/o/";

  let imagePath: string = url.replace(baseUrl, "");

  const indexOfEndPath = imagePath.indexOf("?");

  imagePath = imagePath.substring(0, indexOfEndPath);

  imagePath = imagePath.replace("%2F", "/");

  return imagePath;
  return url;
}
