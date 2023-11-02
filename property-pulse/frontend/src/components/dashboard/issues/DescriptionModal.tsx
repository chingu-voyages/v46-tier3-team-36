import {useState} from 'react';

type  DescriptionModalProps = {
	description: string;
};
//will move styles to lib folder.
const descriptionHidden ="hidden"
const descriptionShowing = "absolute z-10 p-3 h-96 w-64 md:top-1 bottom-1 border-2 border-slate-400 rounded-xl bg-white"
const descriptionModalStyles = "relative flex justify-center w-96"

const DescriptionModal: React.FC<DescriptionModalProps> = ({description}) => {
	const [descriptionStyles, setDescriptionStyles] = useState(descriptionHidden);

	const showDescription = () => {
		descriptionStyles=== descriptionShowing? setDescriptionStyles(descriptionHidden) : setDescriptionStyles(descriptionShowing)
	};
	const closeDescription = () => {
		if(descriptionStyles=== descriptionShowing){
			setDescriptionStyles(descriptionHidden)
		}
	};
	return (
		<div className={descriptionModalStyles} onClick={closeDescription}>
			<button onClick={showDescription}>Details</button>
			<div className={descriptionStyles}>
				<p>{description}</p>
			</div>
		</div>
	)
};

export default DescriptionModal;