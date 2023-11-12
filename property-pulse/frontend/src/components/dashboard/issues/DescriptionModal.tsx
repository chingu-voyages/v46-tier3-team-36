import {useState} from 'react';

import {
	descriptionHidden, 
	descriptionShowing, 
	descriptionModalStyles
} from '@/lib/descriptionModalStyles'

type  DescriptionModalProps = {
	id: string;
	description: string;
};

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
			<button className="w-full"onClick={showDescription}>Details</button>
			<div id={id} className={descriptionStyles}>
				<p>{description}</p>
			</div>
		</div>
	)
};

export default DescriptionModal;