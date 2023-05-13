const express = require("express");
const cors = require("cors");
const { Operation } = require("./modals");
const { getUserInto } = require("./utils/user");

const app = express();
const url = "<URI>";
const dbName = "<DB_NAME>";

const PORT = process.env.PORT || 8000;

app.use(express.json());
// Enable CORS for all routes
app.use(cors());

app.get("/user", async (req, res) => {
	try {
		const user = await getUserInto()

		res.json({username:user?.username,_id:user?._id,email:user?.email});
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
});

app.get("/workspaces", async (req, res) => {
	try {
		const { default: fetch } = await import("node-fetch");
		const {API_KEY} = await getUserInto()
		const response = await fetch("https://api.clickup.com/api/v2/team", {
			headers: {
				Authorization: API_KEY,
			},
		});

		const data = await response.json();
		res.json(data);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
});

app.get("/spaces/:teamId", async (req, res) => {
	try {
		const { teamId } = req.params;
		const {API_KEY} = await getUserInto()
		const spacesUrl = `https://api.clickup.com/api/v2/team/${teamId}/space`;
		const spacesQuery = { archived: false };
		const spacesHeaders = { Authorization: API_KEY };
		const spacesResponse = await fetch(spacesUrl, {
			headers: spacesHeaders,
			params: spacesQuery,
		});

		const spacesData = await spacesResponse.json();
		res.json(spacesData);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
});

app.get("/spaces/:teamId/lists/:spaceId", async (req, res) => {
	try {
		const { teamId, spaceId } = req.params;
		const {API_KEY} = await getUserInto()
		const listUrl = `https://api.clickup.com/api/v2/space/${spaceId}/list`;
		const listQuery = { archived: false };
		const listHeaders = { Authorization: API_KEY };
		const listResponse = await fetch(listUrl, {
			headers: listHeaders,
			params: listQuery,
		});

		const listData = await listResponse.json();
		res.json(listData);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
});

app.get("/spaces/:teamId/lists/:spaceId/tasks/:listId", async (req, res) => {
	try {
		const { listId } = req.params;
		const {API_KEY} = await getUserInto()
		const statusArray = ['complete', 'to do', 'in progress', 'on hold'];
    		const statusString = statusArray.map((el) => `&statuses%5B%5D=${el}`).join('');
		const tasksUrl = `https://api.clickup.com/api/v2/list/${listId}/task?archived=false&page=&order_by=due_date&subtasks=${statusString}`;
		const tasksQuery = {
			archived: false,
			subtasks: true,
			include_closed: true,
		};
		const tasksHeaders = {
			"Content-Type": "application/json",
			"Authorization": API_KEY,
		};
		const tasksResponse = await fetch(tasksUrl, {
			headers: tasksHeaders,
			params: tasksQuery,
		});

		const tasksData = await tasksResponse.json();

		// Add the "contribution_approach" : "Peer review" property to each task object
		tasksData.tasks.forEach((task) => {
			task.contribution_approach = "1/N";
		});

		const parentTasks = tasksData.tasks.filter((task) => task.parent === null);
		const subTasks = tasksData.tasks.filter((task) => task.parent !== null);

		// Create a map of parent tasks by their IDs for faster lookup
		const parentTasksMap = new Map();
		parentTasks.forEach((task) => {
			parentTasksMap.set(task.id, task);
		});

		// Add subtasks to their respective parent tasks
		subTasks.forEach((subTask) => {
			const parentTask = parentTasksMap.get(subTask.parent);
			if (parentTask) {
				if (!parentTask.sub_tasks) {
					parentTask.sub_tasks = [];
				}
				parentTask.sub_tasks.push(subTask.name);
			}
		});

		res.json(tasksData);
		1;
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
});

app.post("/contributions", async (req, res) => {
	try {
		// Get the request body
		const body = req.body;

		const dbUtil = new Operation("contributions");
		
		const result = await dbUtil.create(body);

		res.send(result);
	} catch (error) {
		console.log(error);
	}
});

app.post("/mint", async (req, res) => {
	try {
		// Get the request body
		const body = req.body;

		const dbUtil = new Operation("mint");
		const result = await dbUtil.create(body);

		res.send(result);
	} catch (error) {
		console.log(error);
	}
});

app.post("/issue", async (req, res) => {
	try {
		// Get the request body
		const body = req.body;

		const dbUtil = new Operation("issue");
		const result = await dbUtil.create(body);

		res.send(result);
	} catch (error) {
		console.log(error);
	}
});

app.post("/revoke", async (req, res) => {
	try {
		// Get the request body
		const body = req.body;

		const dbUtil = new Operation("revoke");
		const result = await dbUtil.create(body);

		res.send(result);
	} catch (error) {
		console.log(error);
	}
});

app.post("/settings", async (req, res) => {
	try {
		// Get the request body
		const body = req.body;

		const dbUtil = new Operation("settings");
		const result = await dbUtil.create(body);

		res.send(result);
	} catch (error) {
		console.log(error);
	}
});

app.post("/manage-wallets", (req, res) => {
	try {
		// Get the request body
		const body = req.body;

		const dbUtil = new Operation("manage_wallets");
		
		body?.forEach(async (data, idx)=>{
			const result = await dbUtil.create(data);
		})

		res.send({message:"data saved"});
	} catch (error) {
		console.log(error);
	}
});

app.get("/manage-wallets/:workspaceId", async (req, res) => {
	try {
		// Get the request body
		const {workspaceId} = req.params
		const {spaceId, listId} = req.query;
		
		const dbUtil = new Operation("manage_wallets");

		const query = {}
		if(spaceId){
			query.spaceId = spaceId
		}
		if(listId){
			query.listId = listId
		}

		const manageWallets = await dbUtil.read(query);
		
		res.send({data:manageWallets});
	} catch (error) {
		console.log(error);
	}
});

app.post("/project-contrib", async (req, res) => {
	try {
		// Get the request body
		const body = req.body;

		const dbUtil = new Operation("project_contrib");
		
		body?.forEach(async (data, idx)=>{
			const result = await dbUtil.create(data);
		})

		res.send({message:"data saved"});
	} catch (error) {
		console.log(error);
	}
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});