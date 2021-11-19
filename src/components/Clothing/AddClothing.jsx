import React, { useRef, useEffect, useState, useContext } from "react";
import useHttp from "../../hooks/use-http";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import Tags from "./Tags";
import CategoryFilter from "../Filter/CategoryFilter";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { v4 as uuidv4 } from "uuid";
import { set } from "js-cookie";
import FileUploader from "react-firebase-file-uploader";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import AuthContext from "../../contexts/auth-context";
const AddClothing = (props) => {
  const history = useHistory();

  const { clothingId } = props;
  const { isLoading, error, sendRequest } = useHttp();
  const {
    isLoading: fetchTags_isLoading,
    fetchTags_error,
    sendRequest: fetchTags,
  } = useHttp();
  const {
    fetchCategories_isLoading,
    fetchCategories_error,
    sendRequest: fetchCategories,
  } = useHttp();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [uploadedFilename, setUploadedFilename] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [useCamera, setUseCamera] = useState(false);
  const [defaultSelectedTags, setDefaultSelectedTags] = useState([]);

  const [clothingPictureErrorMessage, setClothingPictureErrorMessage] =
    useState("");
  const [inputNameErrorMessage, setInputNameErrorMessage] = useState("");
  const [selectCategoryErrorMessage, setSelectCategoryErrorMessage] =
    useState("");
  const isEdit = clothingId != null && clothingId != "";

  const ctx = useContext(AuthContext);

  const inputNameRef = useRef();

  const handleUploadStart = () => {
    setIsUploading(true);
    setProgress(0);
  };
  const handleProgress = (progress) => setProgress(progress);
  const handleUploadError = (error) => {
    setIsUploading(false);
    console.error(error);
  };
  const handleUploadSuccess = (filename) => {
    setUploadedFilename(filename);
    setProgress(100);
    setIsUploading(false);
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => setImageUrl(url));
  };

  useEffect(async () => {
    await fetchTags({ url: `tag/${ctx.user.userId}` }, (returnData) => {
      const allTags = [];
      for (const e of returnData) {
        allTags.push({ ...e, isSelected: false, isEdit: false });
      }
      const uniqueTags = [];

      allTags.map((x) =>
        uniqueTags.filter((a) => a.tagId === x.tagId).length > 0
          ? null
          : uniqueTags.push(x)
      );
      setTags(uniqueTags);
    });

    await fetchCategories({ url: "category" }, async (returnData) => {
      setCategories(returnData);
    });

    if (isEdit)
      await sendRequest(
        {
          url: `clothing/${ctx.user.userId}/${clothingId}`,
        },
        async (result) => {
          setImageUrl(result.imageUrl);
          inputNameRef.current.value = result.name;
          setSelectedCategory(result.category.categoryId);

          setDefaultSelectedTags(result.tags);
        }
      );
  }, [fetchTags, fetchCategories, sendRequest]);

  useEffect(() => {
    if (tags && tags.length > 0) {
      const selectedTags = tags.map((e) => {
        return {
          ...e,
          isSelected: defaultSelectedTags.map((x) => x.tagId).includes(e.tagId),
        };
      });
      setTags(selectedTags);
    }
  }, [defaultSelectedTags]);

  const setTagsHandler = (tags) => {
    setTags(tags);
  };
  const changedCategoryHandler = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = inputNameRef.current.value;

    let isAnyError = false;
    if (!imageUrl) {
      setClothingPictureErrorMessage("Please input clothing picture");
      isAnyError = true;
    } else {
      setClothingPictureErrorMessage("");
    }
    if (!enteredName) {
      setInputNameErrorMessage("Please input clothing name");
      isAnyError = true;
    } else {
      setInputNameErrorMessage("");
    }
    if (!selectedCategory) {
      setSelectCategoryErrorMessage("Please select clothing category");
      isAnyError = true;
    } else {
      setSelectCategoryErrorMessage("");
    }
    if (isAnyError) return false;
    const newClothingData = {
      name: enteredName,
      imageUrl: imageUrl,
      tags: tags
        .filter((t) => t.isSelected)
        .map((t) => {
          return {
            tagId: t.tagId,
            name: t.name,
            color: t.color,
          };
        }),
      category: {
        categoryId: parseInt(selectedCategory),
      },
    };
    let url = "";
    let method = "";
    if (isEdit) {
      url = `clothing/${ctx.user.userId}/${clothingId}`;
      method = "PUT";
    } else {
      url = `clothing/${ctx.user.userId}`;
      method = "POST";
    }

    sendRequest(
      {
        url: url,
        method: method,
        body: newClothingData,
      },
      (result) => {
        history.push("/clothings");
      }
    );

    //redirect ke clothings di sini
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    // const confirmed = confirm("y g?!");

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='alert flex flex-col items-center px-8 py-2 space-y-4 border-2  rounded-lg border-red-500 bg-white'>
            <h1 className='alert__title'>Are you sure?</h1>
            <p className='alert__body'>You want to delete this clothing?</p>
            <div className='flex justify-between space-x-4'>
              <button
                onClick={onClose}
                className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-300'
              >
                No
              </button>
              <button
                onClick={() => {
                  sendRequest(
                    {
                      url: `clothing/${ctx.user.userId}/
												${clothingId}`,
                      method: "DELETE",
                    },
                    () => {
                      onClose();
                      history.push("/clothings");
                    }
                  );
                }}
                className='bg-red-700 text-white py-2 px-4 rounded hover:bg-red-500'
              >
                Yes, Delete it!
              </button>
            </div>
          </div>
        );
      },
    });
  };

  const handleTakePhoto = async (dataUri) => {
    const fileType = dataUri.match(/[^:/]\w+(?=;|,)/)[0];
    const ref = `images/${uuidv4()}.${fileType}`;
    firebase
      .storage()
      .ref(ref)
      .putString(dataUri, "data_url")
      .then(() => {
        firebase
          .storage()
          .ref(ref)
          .getDownloadURL()
          .then((url) => {
            setImageUrl(url);
            setUseCamera((prevState) => !prevState);
          });
      });
  };

  const handleUseCamera = () => {
    setImageUrl("");
    setUseCamera((prevState) => !prevState);
  };

  return (
    // <Card>
    <div className='pt-5 flex flex-col md:flex-row md:items-stretch space-y-8 md:space-y-0 md:space-x-2 justify-center items-center'>
      <div className='pt-5 pb-2 px-2 flex flex-col items-center justify-start border-dashed border-2 rounded-lg border-orange-300 space-y-4 md:w-1/3'>
        <div className='text-red-600'>{clothingPictureErrorMessage}</div>

        <div className='text-center flex justify-between items-center w-full space-x-2'>
          <label className='cursor-pointer flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-md py-4 px-2'>
            Upload pic
            <FileUploader
              hidden
              accept='image/*'
              name='avatar'
              randomizeFilename
              storageRef={firebase.storage().ref("images")}
              onUploadStart={handleUploadStart}
              onUploadError={handleUploadError}
              onUploadSuccess={handleUploadSuccess}
              onProgress={handleProgress}
            />
          </label>

          <span>or</span>
          <button
            type='button'
            onClick={handleUseCamera}
            className='flex-1 bg-red-200 rounded-md py-4 px-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold'
          >
            use your camera
          </button>
        </div>
        <div
          className=' flex flex-col items-center justify-center'
          style={{ maxHeight: "24rem" }}
        >
          {isUploading && <p>Progress: {progress}</p>}
          {imageUrl && <img src={imageUrl} className='h-full' />}
          {/* {imageUrl && <ImageCropper src={imageUrl} setImageUrl={setImageUrl} imageUrl={imageUrl} className='bg-red-200' style={{maxHeight:'50px'}}/>} */}
          {useCamera && (
            <Camera
              onTakePhoto={(dataUri) => {
                handleTakePhoto(dataUri);
              }}
            />
          )}
        </div>
      </div>

      <div className='flex flex-col space-y-5 w-2/3'>
        <div className='flex flex-col md:flex-row items-center justify-center md: space-x-2'>
          <label className='block w-1/2'>
            <span className='text-gray-500 text-sm '>Clothing Name</span>
            <input
              className=' mt-1 block w-full py-2 focus:outline-none border-0 bg-transparent border-b-2 border-gray-600 text-lg'
              placeholder='Clothing Name'
              ref={inputNameRef}
            />
            <span className='text-red-600'>{inputNameErrorMessage}</span>
          </label>
          <label className='w-1/2'>
            <span className='text-gray-500 text-sm'>Category</span>
            <CategoryFilter
              categories={categories}
              onChangedCategory={changedCategoryHandler}
              className='w-full mt-1 text-lg'
              selectedCategoryId={selectedCategory}
            />
            <span className='text-red-600'>{selectCategoryErrorMessage}</span>
          </label>
        </div>

        <hr />

        <Tags tags={tags} onSetTags={setTagsHandler} />

        <hr />

        <div className='flex justify-end space-x-4'>
          {isEdit && (
            <div
              onClick={deleteHandler}
              className='py-2 hover:text-gray-200 hover:bg-red-400  rounded cursor-pointer w-1/3 text-center border-red-400 border'
            >
              Delete Clothing
            </div>
          )}
          <button
            onClick={submitHandler}
            className='py-2 px-1 w-2/3 hover:bg-purple-400  font-semibold hover:text-white rounded border-2 border-purple-400'
          >
            {isEdit ? "Update Clothing" : "Add Clothing"}
          </button>
        </div>
      </div>
    </div>
    // </Card>
  );
};

export default AddClothing;
