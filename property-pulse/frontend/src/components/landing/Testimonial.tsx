type TestimonialProps = {
	testimonial: string;
};

const Testimonial = ({testimonial}:TestimonialProps) =>{
	return(
		<div className="rounded-xl bg-slate-200 m-3">
			<p className="p-3">
				{testimonial}
			</p>
			<p className="text-blue-800 p-1">By so and so</p>
		</div>
	)
}
export default Testimonial