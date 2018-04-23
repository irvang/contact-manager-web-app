const Todos = require('./todoModel');

class TodoClass {
	constructor(userName, toDo, isDoneStr, hasAtttachmentBool){
		return Todos({
			username: userName,
			todo: toDo,
			isDone: isDoneStr,
			hasAttachment: hasAtttachmentBool
		});
	}
}

module.exports = TodoClass;