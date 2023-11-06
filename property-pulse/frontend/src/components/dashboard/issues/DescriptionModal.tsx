import {useState} from 'react';

type  DescriptionModalProps = {
	id: string;
	description: string;
};
//will move styles to lib folder.
const descriptionHidden ="hidden"
const descriptionShowing = "absolute z-10 p-3 h-96 w-64 border-2 border-slate-400 rounded-xl bg-green-200"
const descriptionModalStyles = "relative flex-col justify-center w-1/3"

const DescriptionModal: React.FC<DescriptionModalProps> = ({id,description}) => {
	const [descriptionStyles, setDescriptionStyles] = useState(descriptionHidden);

	const showDescription = () => {
		//opens details modal realative to parent container and location on screen.
		const modal = document.getElementById(id);
		const modalContainer = document.getElementById(`${id}Container`);
		if(!modal || !modalContainer) return;
		descriptionStyles=== descriptionShowing? setDescriptionStyles(descriptionHidden) : setDescriptionStyles(descriptionShowing)

		const rect = modalContainer?.getBoundingClientRect();
		//const modalRect = modal?.getBoundingClientRect();

		const topSpace = rect?.top || 0;
		const bottomSpace:number = window.innerHeight - (rect?.bottom || 0);
		const leftSpace = rect?.left || 0;
		const rightSpace:number = window.innerWidth - (rect?.right || 0);

		modal.style.top = bottomSpace/3 - topSpace + "px";
		modal.style.left = rightSpace/2 - leftSpace + "px";
	};

	const closeDescription = () => {
		if(descriptionStyles=== descriptionShowing){
			setDescriptionStyles(descriptionHidden)
		}
	};
	return (
		<div id={`${id}Container`} className={descriptionModalStyles} onClick={closeDescription}>
			<button onClick={showDescription}>Details</button>
			<div id={id} className={descriptionStyles}>
				<p>{description}</p>
			</div>
		</div>
	)
};

export default DescriptionModal;