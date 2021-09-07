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
		console.log('takePhoto');
		setImageUrl(dataUri);
		setUseCamera(false);
	}

	function handleUseCamera() {
		setImageUrl('');
		setUseCamera(!useCamera);
	}


	return (
		// <Card>
			<form onSubmit={submitHandler} className='flex flex-col md:flex-row md:items-stretch space-y-8 md:space-y-0 md:space-x-2 justify-center items-center'>
				<div className='pt-5 pb-2 px-2 flex flex-col items-center justify-center border-dashed border-2 rounded-lg border-orange-300 space-y-4 md:w-1/2'>
					<div className='text-center flex justify-between items-center w-full space-x-2'>
						<CustomUploadButton
							accept='image/*'
							name='avatar'
							randomizeFilename
							storageRef={firebase.storage().ref('images')}
							onUploadStart={handleUploadStart}
							onUploadError={handleUploadError}
							onUploadSuccess={handleUploadSuccess}
							onProgress={handleProgress}
							className='cursor-pointer flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-md py-4 px-2'
						>
							upload your image
						</CustomUploadButton>
						<span>or</span>
						<button onClick={handleUseCamera} className='flex-1 bg-red-200 rounded-md py-4 px-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold'>
							use your camera
						</button>
					</div>
					<div className=' flex flex-col items-center justify-center' style={{maxHeight:'24rem'}}>
						{isUploading && <p>Progress: {progress}</p>}
						{imageUrl && <img src={imageUrl} className='h-full'/>}
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
								
				<div className='w-full flex flex-col space-y-5'>
					<label className='block'>
						<span className='text-gray-700'>Clothing Name</span>
						<input
							className='form-input mt-1 block w-full rounded active:border-none border-none'
							placeholder='Clothing Number 1'
							ref={inputNameRef}
						/>
					</label>

					<hr />

					<SelectTagList tags={tags} onSelectedTag={selectTagHandler} />
								
					<hr />

					<CategoryFilter
						categories={categories}
						onChangedCategory={changedCategoryHandler}
						className='w-full'
					/>

					<div className='flex justify-end'>
						<button className='py-2 px-1 w-1/3 hover:bg-purple-400 hover:text-white rounded border-2 border-purple-400'>Add Clothings</button>
					</div>
				</div>
			</form>
		// </Card>
	);
};

export default AddClothing;
