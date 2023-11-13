import { AiFillGithub } from 'react-icons/ai';

const Footer = () => {
	return (
		<footer className="fixed bg-green-900 w-full h-12 bottom-0 left-0 right-0 flex flex-row items-center justify-center text-white">
			<a href="https://github.com/chingu-voyages/v46-tier3-team-36" className="flex flex-row gap-2 items-center">
				<AiFillGithub/>
				v46-tier3-team-36
			</a>
		</footer>
	);
};

export default Footer;