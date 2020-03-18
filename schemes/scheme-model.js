const db = require('./../data/db-config');

module.exports = {
	find,
	findById,
	findSteps,
	add,
	update,
    remove,
    addStep
};


//array of schemes
function find() {
//     Calling find returns a promise that resolves to an array of all schemes in the database.
// No steps are included.
	return db('schemes');
}

//single user or null
function findById(id) {
//     Expects a scheme id as its only parameter.
// Resolve to a single scheme object.
// On an invalid id, resolves to null.
	return db('schemes')
		.where({ id })
		.first();
}

function findSteps(id) {
    // Expects a scheme id.
    // Resolves to an array of all correctly ordered step for the given scheme: [ { id: 17, scheme_name: 'Find the Holy Grail', step_number: 1, instructions: 'quest'}, { id: 18, scheme_name: 'Find the Holy Grail', step_number: 2, instructions: '...and quest'}, etc. ].
    // This array should include the scheme_name not the scheme_id.
	return db('steps as st')
		.join('schemes as sc', 'sc.id', 'st.scheme_id')
		.select('sc.scheme_name', 'st.step_number', 'st.instructions')
		.where('sc.id', id)
		.orderBy('st.step_number');
}

function add(scheme) {
    // Expects a scheme object.
    // Inserts scheme into the database.
    // Resolves to the newly inserted scheme, including id.
	return db('schemes')
		.insert(scheme)
		.then(ids => {
			return findById(ids[0]);
		});
}

function update(changes, id) {
//     Expects a changes object and an id.
// Updates the scheme with the given id.
// Resolves to the newly updated scheme object.
	return db('schemes')
		.where({ id })
        .update(changes)
        .then(() => {
            return findById(id);
        });
}

function remove(id) {
//     Removes the scheme object with the provided id.
// Resolves to the removed scheme
// Resolves to null on an invalid id.
// (Hint: Only worry about removing the scheme. 
// The database is configured to automatically
//  remove all associated steps.)
	return db('schemes')
		.where({ id })
        .del()
        
}

function addStep(step, scheme_id) {
    step.scheme_id = scheme_id;
    return db("steps")
        .insert(step)
        .then(() => {
            return findSteps(scheme_id)
        })
}
