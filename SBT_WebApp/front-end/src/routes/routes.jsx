import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import MangeProject from "../Pages/manage-project";
import Navbar from "../components/navbar";
import { getLists, getSpaces, getTasks, getWorkspaces } from "../services";
import AppSubHeader from "../components/headers/sub-header";
import { findObjectByValue } from "../utils/helpers";
import Mint from "../Pages/mint";
import Revoke from "../Pages/revoke";
import Settings from "../Pages/settings";
import SBTSettings from "../Pages/sbt-settings";
import ManageWallets from "../Pages/manage-wallets";
import Dashboard from "../Pages/dashboard";
import { getManageWallets } from "../services/manage-wallets";

const PAGES = [
	{
		id: "1",
		name: "Dashboard",
		route: "/dashboard",
		bgColor: "rgb(255, 29, 207)",
	},
	{
		id: "2",
		name: "Manage Project",
		route: "/manage-project",
		bgColor: "rgb(255, 101, 119)",
	},
	{
		id: "3",
		name: "Manage Wallets",
		route: "/manage-wallets",
		bgColor: "rgb(255, 133, 82)",
	},
	{
		id: "4",
		name: "Mint SBT",
		route: "/mint",
		bgColor: "rgb(255, 174, 32)",
	},
	{
		id: "5",
		name: "Revoke SBT",
		route: "/revoke",
		bgColor: "rgb(123, 80, 252)",
	},
	{
		id: "6",
		name: "SBT Settings",
		route: "/sbt-settings",
		bgColor: "rgb(105, 126, 251)",
	},
	{
		id: "7",
		name: "Settings",
		route: "/settings",
		bgColor: "rgb(83, 181, 250)",
	},
];

const AppRoutes = () => {
	const [activeTab, setActiveTab] = useState({});

	const [workspaces, setWorkspaces] = useState([]);
	const [selectedWs, setSeletedWs] = useState({});

	const [spaces, setSpaces] = useState([]);
	const [selectedSpace, setSelectedSpace] = useState({});

	const [lists, setLists] = useState([]);
	const [activeList, setActiveList] = useState({});

	const [tasks, setTasks] = useState([]);

    const [assignees, setAssignees] = useState([]);
    const [selectedAssignee, setSelectedAssignee] = useState([]);

	const [userWallets, setUserWallets] = useState({})
	const [manageWallets, setManageWallets] = useState([])

	const navigate = useNavigate();

    useEffect(()=>{
        const path = window.location.pathname
        if(path === "/") {
            navigate("manage-project")
        }

        const [currTab] = PAGES.filter((page)=> page.route === path )
        setActiveTab(currTab)
        
    },[])

    useEffect(() => {
        const updatedAssignees = []
        if(tasks.length){
            for(let i = 0; i < tasks.length;i++){
                const assignees = tasks[i]?.assignees || []
                for(let j = 0; j < assignees.length;j++){
                    const assignee = assignees[j]
                    const isAssigneeExists = updatedAssignees.filter((a)=> a._id === assignee.id ).length
                    if( !isAssigneeExists )
                        updatedAssignees.push({_id:assignee.id, value: assignee?.username , data:assignee})
                }
            }
        }
		setAssignees(updatedAssignees);
	}, [tasks]);

	useEffect(() => {
		fetchWs();
	}, []);

	useEffect(() => {
		if (selectedWs?._id) fetchSpace(selectedWs?._id);
	}, [selectedWs]);

	useEffect(() => {
		if (selectedSpace?._id && selectedWs?._id) fetchLists(selectedWs?._id, selectedSpace?._id);
	}, [selectedSpace]);

	useEffect(() => {
		if (selectedSpace?._id && selectedWs?._id && activeList?._id)
			fetchTasks(selectedWs?._id, selectedSpace?._id, activeList?._id);
	}, [activeList]);

	useEffect(()=>{
		if (selectedSpace?._id && selectedWs?._id && activeList?._id){
			fetchUserWallets()
		}
	},[activeList, selectedWs, selectedSpace])

	useEffect(()=>{
		if (manageWallets.length){
			const updatedUserWallets = {...userWallets}
			for (let wallet of manageWallets) {
				updatedUserWallets[wallet.email] = wallet?.walletaddress
			}
			setUserWallets(updatedUserWallets)
		}
	},[manageWallets])


	const fetchWs = async () => {
		const ws = await getWorkspaces();
		setWorkspaces(ws?.data?.teams.map((w) => ({ _id: w.id, value: w.name, data: w })));
	};

	const fetchSpace = async (id) => {
		const spacesData = await getSpaces(id);
		setSpaces(spacesData?.data?.spaces.map((s) => ({ _id: s.id, value: s.name, data: s })));
	};

	const fetchLists = async (workspaceId, spaceId) => {
		const lst = await getLists(workspaceId, spaceId);
		const listData = lst?.data?.lists.map((l) => ({ _id: l.id, value: l.name, data: l }));
		setLists(listData);
		setActiveList(listData[0]);
	};

	const fetchTasks = async (workspaceId, spaceId, listId) => {
		const tsk = await getTasks(workspaceId, spaceId, listId);
		const tasksData = tsk?.data?.tasks;
		const sanitizeTasks = tasksData?.map((task)=>  {
			if(task?.contribution_approach === "1/N" ){

				const contribs = task?.assignees?.map((a)=>{
					const newContrib = {[a.username]: parseFloat((100 / task.assignees.length).toFixed(0))}
					return newContrib;
				})

				return {...task, contributions : contribs}

			}

			return task
		})

		setTasks(sanitizeTasks);
	};

	const fetchUserWallets = async () =>{
		const wallets = await getManageWallets(selectedWs?._id, selectedSpace?._id, activeList?._id)
		setManageWallets(wallets || [])
	}

	const handleWsChange = async (event) => {
		const s = findObjectByValue(event.target.value, workspaces);
		setSeletedWs(s);
	};

	const handleSpaceChange = (event) => {
		setSelectedSpace(findObjectByValue(event.target.value || event.target.getAttribute("value"), spaces));
	};

	const handleAssigneehange = (event) => {
		setSelectedAssignee(findObjectByValue(event.target.value || event.target.getAttribute("value"), assignees));
	};

	const handleTabClick = (tab) => {
		setActiveTab(tab);
		navigate(tab?.route);
	};

	return (
		<div className="app-pages">
			<Navbar PAGES={PAGES} activeTab={activeTab} handleTabClick={handleTabClick} />
			<AppSubHeader
				tab={activeTab}
				selectedWs={selectedWs}
				handleWsChange={handleWsChange}
				workspaces={workspaces}
				selectedSpace={selectedSpace}
				handleSpaceChange={handleSpaceChange}
				spaces={spaces}
				lists={lists}
				activeList={activeList}
				setActiveList={setActiveList}

                assignees={assignees}
                handleAssigneehange={handleAssigneehange}
                selectedAssignee={selectedAssignee}
			/>
            <div className="page-continer">
        <div className="app-routes-wrapper" >
			<Routes>
				<Route
					path="dashboard"
					element={<Dashboard />}
				/>
				<Route
					path="manage-project"
					element={<MangeProject tasks={tasks} setTasks={setTasks} userWallets={userWallets} />}
				/>
				<Route
					path="manage-project/:workspaceId/:spaceId"
					element={<MangeProject tasks={tasks} setTasks={setTasks} userWallets={userWallets} />}
				/>
				<Route
					path="mint"
					element={<Mint workspaceId={selectedWs?._id} spaceId={selectedSpace?._id} assignee={selectedAssignee} />}
				/>
				<Route
					path="revoke"
					element={<Revoke workspaceId={selectedWs?._id} spaceId={selectedSpace?._id} assignee={selectedAssignee} />}
				/>
				<Route
					path="settings"
					element={<Settings />}
				/>
				<Route
					path="sbt-settings"
					element={<SBTSettings />}
				/>
				<Route
					path="manage-wallets"
					element={<ManageWallets assignees={ manageWallets.length ?  manageWallets : assignees.map((a)=> a.data )} workspaceId={selectedWs?._id} spaceId={selectedSpace?._id} activeListId={activeList?._id} userWallets={userWallets} setUserWallets={setUserWallets} />}
				/>
			</Routes>
        </div>
            </div>
		</div>
	);
};

export default AppRoutes;
