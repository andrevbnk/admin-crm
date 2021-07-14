<template>
	<file-tree :tree="tree" :defaultTree="defaultTree"/>
</template>

<script>
import { mapActions } from "vuex";
import FileTree from "@/components/Tree/FileTree";

export default {
	components: {
		FileTree,
	},
	data: function () {
		return {
			tree: {},
			defaultTree: {},
		};
	},

	created: function () {
		this.getTree().then((tree) => {
			this.tree = tree;
			this.defaultTree = tree;
		});
	},

	methods: {
		...mapActions(["getTree", "saveTree"]),
	},
};
</script>

<style>
</style>