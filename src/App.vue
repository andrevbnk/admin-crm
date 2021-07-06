<template>
	<v-app id="inspire">
		<v-navigation-drawer v-model="drawer" app>
			<v-sheet color="grey lighten-4" class="pa-4">
				<v-avatar
					class="mb-4"
					color="grey darken-1"
					size="64"
				></v-avatar>

				<div>john@vuetifyjs.com</div>
			</v-sheet>

			<v-divider></v-divider>

			<v-list>
				<v-list-item v-for="[icon, text] in links" :key="icon" link>
					<v-list-item-icon>
						<v-icon>{{ icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ text }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-main>
			<v-container class="py-8 px-6" fluid>
				<v-row>
					<v-col>
						<div>
							<h1>Basic</h1>
							<div>
								<blocks-tree
									:data="treeData"
									:horizontal="treeOrientation == '1'"
									:collapsable="true"
								></blocks-tree>
							</div>

							<h1>With slots</h1>
							<div>
								<blocks-tree
									:data="treeData"
									:horizontal="treeOrientation == '1'"
									:collapsable="true"
									:props="{
										label: 'label',
										expand: 'expand',
										children: 'children',
										key: 'some_id',
									}"
								>
									<template #node="{data}">
										<div class="container">
											<div class="row">
												<div class="col-md-12">
													<ul>
														<li class="col-md-3">
															<div
																class="front"
															>{{data.label}}
															{{data.some_id}}
															</div>
															<div class="back">
																{{data.label}}
															</div>
														</li>
													</ul>
												</div>
											</div>
										</div>

										<!-- <span>
											<input
												type="checkbox"
												:checked="
													selected.indexOf(
														data.some_id
													) > -1
												"
												@change="
													(e) =>
														toggleSelect(
															data,
															e.target.checked
														)
												"
											/>
											{{ data.label }}
										</span>
										<br />
										<span
											v-if="
												data.children &&
												data.children.length
											"
										>
											<a
												href="#"
												@click="context.toggleExpand"
												>toggle expand</a
											>
										</span> -->
									</template>
								</blocks-tree>
								<div>Selected: {{ selected }}</div>
							</div>

							<h1>Change orientation</h1>
							<select v-model="treeOrientation">
								<option value="0">Vertical</option>
								<option value="1">Horizontal</option>
							</select>
						</div>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
	setup() {
		const drawer = true;
		const show = ref(false);

		const links = [
			["mdi-inbox-arrow-down", "Inbox"],
			["mdi-send", "Send"],
			["mdi-delete", "Trash"],
			["mdi-alert-octagon", "Spam"],
		];

		const selected = ref([]);
		let treeOrientation = ref("0");
		let treeData = reactive({
			label: "root",
			expand: true,
			some_id: 1,
			children: [
				{ label: "child 1", some_id: 2 },
				{ label: "child 2", some_id: 3 },
				{
					label: "subparent 1",
					some_id: 4,
					expand: false,
					children: [
						{ label: "subchild 1", some_id: 5 },
						{
							label: "subchild 2",
							some_id: 6,
							expand: false,
							children: [
								{ label: "subchild 11", some_id: 7 },
								{ label: "subchild 22", some_id: 8 },
							],
						},
					],
				},
			],
		});

		const toggleSelect = (node, isSelected) => {
			isSelected
				? selected.value.push(node.some_id)
				: selected.value.splice(
						selected.value.indexOf(node.some_id),
						1
				);
			if (node.children && node.children.length) {
				node.children.forEach((ch) => {
					toggleSelect(ch, isSelected);
				});
			}
		};

		return {
			treeData,
			selected,
			toggleSelect,
			treeOrientation,
			drawer,
			links,
			show,
		};
	},
});
</script>

<style lang="scss" scoped>
ul {
	perspective: 600;
	margin: 0 auto;
}


.container{
	-webkit-transform-style: preserve-3d;
	transform-style: preserve-3d;
	-webkit-perspective: 1000px;
	perspective: 1000px;
	height: 100px;
}

li {
	width: 300px;
	height: 100px;
	float: left;
	list-style: none;
	margin-right: 20px;
	margin-bottom: 10px;
	position: relative;
	cursor: pointer;
	counter-increment: item;
	div {
		width: 100%;
		height: 100%;
		position: absolute;
		border-radius: 5px;
		transition: all 0.5s;
		backface-visibility: hidden;
		box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
	}
	img {
		width: 100%;
		height: 100%;
		position: absolute;
		border-radius: 5px;
	}
	&:hover .front {
		z-index: 0;
		transform: rotateY(180deg);
	}
	&:hover .back {
		transform: rotateY(0);
	}
}

.front {
	z-index: 3;
	color: #333;
	text-align: center;
	font-size: 20px;

}

.back {
	transform: rotateY(180deg);
}
</style>