'use client'
import Image from 'next/image';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { useDashboardContext } from './layout';

const DashboardLanding = () => {
	const { showSideMenu } = useDashboardContext();
	return (
		<div className="flex flex-col gap-5 text-black">
			{/* Heading */}
			<section className="flex flex-col items-center gap-5">
				<Image src="/dashboard-landing.svg" alt="Dashboard Landing" width={0} height={0} priority className="w-[200px] md:w-[300px]" />
				<h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-green-900 uppercase text-center">
					welcome to rental property llc
				</h1>
			</section>
			{/* Main Contents */}
			<section className={`flex gap-5 justify-center lg:gap-10 flex-col ${showSideMenu ? 'sm:flex-col lg:flex-row' : 'md:flex-row'}`}>
				{/* Important Dates Section */}
				<aside className={`bg-green-100 p-5 rounded-xl flex flex-col gap-5  ${showSideMenu ? 'sm:self-center lg:self-start' : 'md:self-start'}`}>
					<div>
						<h2 className="underline text-lg font-bold capitalize">important dates</h2>
						<p className="flex flex-col">
							<span className="font-bold capitalize">1st of every month</span>
							Rent Due
						</p>
						<p className="flex flex-col">
							<span className="font-bold capitalize">every tuesday & friday</span>
							Trash and Recycling Collection
						</p>
					</div>
					<div>
						<h2 className="underline text-lg font-bold capitalize">leasing office</h2>
						<p className="flex flex-col">
							<span className="font-bold capitalize">office hours</span>
							<span>Mon-Fri: 9:00AM - 5:00PM</span>
							<span>Sat: 9:00AM - 12:00PM</span>
							<span>Sun: Closed</span>
						</p>
						<p className="flex flex-col">
							<span className="font-bold capitalize">address</span>
							<span>1 Main Street</span>
							<span>Long Beach CA, 12345</span>
						</p>
						<p className="flex font-bold items-center gap-1">
							<BsFillTelephoneFill /> <a href="tel:123-456-7890">123-456-7890</a>
						</p>
						<p className="flex font-bold items-center gap-1 break-all">
							<MdEmail />
							<a href="mailto:leasing@rentalpropertyllc.com">leasing@rentalpropertyllc.com</a>
						</p>
					</div>
				</aside>
				{/* News and Upcoming Events Section */}
				<section className={`flex flex-col gap-10 items-center ${showSideMenu ? 'md:w-full lg:w-1/3' : 'md:w-1/3'}`}>
					<div>
						<div className="flex flex-col items-center text-xl font-bold">
							<h1 className="uppercase">News</h1>
							<Image src="/news.svg" alt="News" width={0} height={0} className="w-[150px]"/>
						</div>
						<ul>
							<li className="my-2">
								<span className="font-bold">Pest Control</span>: Maintenance will enter home for pest
								inspection between Oct. 15 and Nov. 1. This will take 15 minutes.
								Please contact us if you have any questions or concerns.
							</li>
							<li className="my-2">
								<span className="font-bold">Referral Program</span>:
								Refer someone for a chance to get $500 bonus! Contact us for more details.
							</li>
						</ul>
					</div>
					<div>
						<div className="flex flex-col items-center text-xl font-bold">
							<h2 className="uppercase">Upcoming Events</h2>
							<p>Save the Date!</p>
							<p className="text-sm italic font-normal">All events are held at the clubhouse.</p>
							<Image src="/upcoming-events.svg" alt="News" width={0} height={0} className="w-[150px]"/>
						</div>
						<ul>
							<li className="my-2">
								<span className="font-bold">Halloween Party</span>:
								Join us for a costume party to celebrate Halloween.
								<span className="underline">October 31 10:00 p.m. - 12:00 a.m.</span>
							</li>
							<li className="my-2">
								<span className="font-bold">Thanksgiving Dinner</span>:
								As we gather together to give thanks this year, we invite you to share in the holiday cheer!
								Please join us for Thanksgiving Dinner.
								<span className="underline">November 19 6:00 p.m. - 8:00 p.m.</span>
							</li>
							<li className="my-2">
								<span className="font-bold">Christmas Party (Dec 14)</span>:
								Please join us for our annual Christmas Party.
								<span className="underline">December 14 2:00 p.m. - 6:00 p.m.</span>
							</li>
						</ul>
					</div>
				</section>
			</section>
		</div>
	);
};

export default DashboardLanding