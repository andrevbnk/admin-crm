const getIncId = (tree) => {
	let max = 0;
	function recurSearch(nodes) {
		for (let node of nodes) {
			if (node.id > max) {
				max = node.id;
			}
			if (node.children?.length) {
				recurSearch(node.children);
			}
		}
	}
	recurSearch(tree);
	return max + 1;
};

const deleteNode = (tree, id) => {
	const copyTree = JSON.parse(JSON.stringify(tree));

	function recurSearch(nodes) {
		nodes.children = nodes.children?.filter((childNode) => {
			if (childNode.children?.length) {
				recurSearch(childNode);
			}
			return childNode.id !== id;
		});
	}
	recurSearch(copyTree);
	return copyTree;
};

const getDefaultNode = (tree) => {
	const nodeId = getIncId(tree.children);
	return {
		id: nodeId,
		name: `Заголовок ${nodeId}`,
		description: "",
		attachments: [],
		children: [],
	};
};

const getNodeById = (tree,id) => {
	let findedNode = null;
	function recurSearch(nodes) {
		return nodes.children?.find((node)=>{
			if(node.id == id){
				findedNode = node;
			}
			recurSearch(node);
		});
	}

	recurSearch(tree);
	return findedNode;
};

const mapShortToLong = new Map([
    ["options", "children"],
	["children", "options"],
    // ["d",  "data"],
]);


function refit_keys(o){
    // Only handle non-null objects
    if (o === null || typeof o !== "object") {
        return o;
    }

    // Handle array just by handling their contents
    if (Array.isArray(o)) {
        return o.map(refit_keys);
    }

    const build = {};
    for (const key in o) {
        // Get the destination key
        const destKey = mapShortToLong.get(key) || key;

        // Get the value
        let value = o[key];

        // If this is an object, recurse
        if (typeof value === "object") {
            value = refit_keys(value);
        }

        // Set it on the result using the destination key
        build[destKey] = value;
    }
    return build;
}
export { getDefaultNode, deleteNode, getNodeById, refit_keys }