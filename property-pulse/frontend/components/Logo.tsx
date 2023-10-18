import Image from 'next/image';

/**
 * Main Application Logo
 * @returns TSX
 */
export default function Logo() {
	return (
		<Image
			src="/logo.svg"
			alt="PulseProperty Logo"
			// Unable to set auto for next/image height attribute. Set 0 and use style instead
			width={0}
			height={0}
			// Make the logo smaller for smaller screens
			className="h-auto w-36 sm:w-60"
			priority
		/>
	)
}