import React, { useRef, useEffect, useState } from 'react';
import Card from '../components/UI/Card';
import useHttp from '../hooks/use-http';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import SelectTagList from '../components/SelectTag/SelectTagList';
import CategoryFilter from '../components/Filter/CategoryFilter';

import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const AddClothing = (props) => {
	const history = useHistory();

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

	const [uploadedFilename, setUploadedFilename] = useState('');
	const [isUploading, setIsUploading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [imageUrl, setImageUrl] = useState('');
	const [tags, setTags] = useState([]);
	const [useCamera, setUseCamera] = useState(false);
	const [capturedImage, setCapturedImage] = useState('');

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
			.ref('images')
			.child(filename)
			.getDownloadURL()
			.then((url) => setImageUrl(url));
	};

	useEffect(() => {
		fetchTags({ url: 'tag/xu7Di7YPp4hvrN250XWwqcy7YVLY' }, (returnData) => {
			const allTags = [];
			for (const e of returnData) {
				allTags.push({ ...e, isSelected: false });
			}
			const uniqueTags = [];

			allTags.map((x) =>
				uniqueTags.filter((a) => a.tagId === x.tagId).length > 0
					? null
					: uniqueTags.push(x)
			);
			setTags(uniqueTags);
		});
	}, [fetchTags]);

	useEffect(() => {
		fetchCategories({ url: 'category' }, (returnData) => {
			setCategories(returnData);
		});
	}, [fetchCategories]);

	const selectTagHandler = (tags) => {
		setTags(tags);
	};
	const changedCategoryHandler = (selectedCategory) => {
		setSelectedCategory(selectedCategory);
	};
	const submitHandler = (event) => {
		event.preventDefault();
		const enteredName = inputNameRef.current.value;

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

		console.log(newClothingData);

		sendRequest(
			{
				url: 'clothing/xu7Di7YPp4hvrN250XWwqcy7YVLY',
				method: 'POST',
				body: newClothingData,
			},
			(result) => {
				console.log(result);
				history.push('/clothings');
			}
		);

		//redirect ke clothings di sini
	};

	function handleTakePhoto(dataUri) {
		// Do stuff with the photo...
		console.log('takePhoto');
		// console.log(dataUri)
		setImageUrl(dataUri);
		setUseCamera(false);
	}

	function handleUseCamera() {
		setImageUrl('');
		setUseCamera(!useCamera);
	}

	return (
		<Card>
			<form onSubmit={submitHandler}>
				<div className='p-5 m-5 bg-gray-300 flex flex-col items-center justify-center'>
					{isUploading && <p>Progress: {progress}</p>}
					{imageUrl && <img src={imageUrl} />}
					{useCamera && (
						<Camera
							onTakePhoto={(dataUri) => {
								handleTakePhoto(dataUri);
							}}
						/>
					)}
					<CustomUploadButton
						accept='image/*'
						name='avatar'
						randomizeFilename
						storageRef={firebase.storage().ref('images')}
						onUploadStart={handleUploadStart}
						onUploadError={handleUploadError}
						onUploadSuccess={handleUploadSuccess}
						onProgress={handleProgress}
						className='bg-gray-300 p-5 m-5'
					>
						upload your image
					</CustomUploadButton>
					or{' '}
					<button onClick={handleUseCamera}>use your camera</button>
				</div>

				<label className='block'>
					<span className='text-gray-700'>Name</span>
					<input
						className='form-input mt-1 block w-full'
						placeholder=''
						ref={inputNameRef}
					/>
				</label>

				<SelectTagList tags={tags} onSelectedTag={selectTagHandler} />

				<CategoryFilter
					categories={categories}
					onChangedCategory={changedCategoryHandler}
				/>

				<div>
					<button>Add Clothings</button>
				</div>
			</form>
		</Card>
	);
};

export default AddClothing;
