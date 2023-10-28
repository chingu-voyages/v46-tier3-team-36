'use client';

const formStyles = "flex flex-col justify-around absolute md:w-1/3 h-3/4 m-10 p-2 border-2 rounded-xl shadow-xl shadow-slate-600 border-slate-400 bg-slate-100"
const formSection ="flex flex-col"
const inputStyles = "border-2 border-green-800 focus:outline-none focus-visible:border-green-600 rounded-xl p-2";
const btnInputStyles ="mb-4 p-3 bg-green-800 hover:bg-green-600 text-white rounded";
const textAreaStyles = "border-2 border-green-800 focus:outline-none focus-visible:border-green-600 rounded-xl p-2"
const selectStyles ="flex flex-col font-medium mt-4 rounded-lg bg-green-800  text-white p-2";


const IssuesForm = () => {

	const handleSubmit = async (e: { preventDefault: () => void; target: any; }) =>{
		e.preventDefault();
		const form = e.target
		const formData = new FormData(form);
		const newIssue = Object.fromEntries(formData.entries());
		
		const response = await fetch('/api/admin/issues',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newIssue)
		});
		const data = await response.json();
		console.log(data)// error - {msg: '\nInvalid `prisma.issue.create()` invocation in\n/ho…id value for argument `type`. Expected IssueType.'}

		console.log(newIssue)
		form.reset();
	}

	return(
			<form className={formStyles} onSubmit={handleSubmit}>			
				<div className={formSection}>
					<label>Title</label>
					<input name="title" placeholder="e.g.Broken window" className={inputStyles} type = "text" />
				</div>
				<div className={formSection}>
					<label>Choose Type</label>
					<select name="type"className={selectStyles}>
						<option value="inquiry">Inquiry</option>
						<option value="report">Report</option>
						<option value="request">Request</option>
					</select>
				</div>
				<div className={formSection}>
					<textarea rows={10} name="description" placeholder="details" className={textAreaStyles} />
				</div>
				<input className={btnInputStyles} type = "submit" />
			</form>
	)
};
export default IssuesForm;