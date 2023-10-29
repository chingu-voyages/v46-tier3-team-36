import Image from 'next/image';

const ErrorDisplay = ({message}:{message:string}) => {
	return (
		<div className="p-5 flex flex-col justify-center items-center gap-5 w-full h-full">
			<p className="font-bold">{message}</p>
			<Image
				src="/problem.svg"
				alt="Error Encountered"
				// Unable to set auto for next/image height attribute. Set 0 and use style instead
				width={0}
				height={0}
				// Make the logo smaller for smaller screens
				className={`h-auto w-[150px] sm:w-[400px]`}
				priority
			/>
		</div>
	);
};

export default ErrorDisplay;