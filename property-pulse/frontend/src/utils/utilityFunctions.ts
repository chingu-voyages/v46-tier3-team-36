// getUpdatedObject takes an object with an arbitrary number of keys with any value type.
// it returns an object containing only values which aren't equal to <"">
// * in uncontrolled 'edit' forms this "parses" the object and avoids passing empty vaules to the update.

//* no longer using this funciton in IssuesForm as 'defaultValue' now is equal to "unchanged" values.
const getUpdatedObject = (edit:Record<string, any>): Record<string, any> => {
	const keys = Object.keys(edit);
	let updatedObject:Record<string, any> = {};
	
	for(let i=0; i<=keys.length-1; i++){
		const key = keys[i];
		const value = edit[keys[i]];
		if(edit[keys[i]] !== ""){
			updatedObject[keys[i]] = edit[keys[i]];
		}
	}

	return updatedObject;
}
export { getUpdatedObject };