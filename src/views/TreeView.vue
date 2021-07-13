<template>
	<div class="wrap" @wheel.prevent="zoomWheel">
		<div class="group-button">
			<v-btn class="mx-2" icon fab @click="zoomIn">
				<v-icon large dark> mdi-magnify-plus-outline </v-icon>
			</v-btn>

			<v-btn class="mx-2" icon fab @click="zoomOut">
				<v-icon large dark> mdi-magnify-minus-outline </v-icon>
			</v-btn>

			<v-btn class="mx-2" icon fab @click="restore">
				<v-icon color="black" large dark> mdi-restore </v-icon>
			</v-btn>

			<v-btn
				class="mx-2"
				color="blue"
				fab
				@click="saveDialog"
				:loading="loading"
				:disabled="loading"
			>
				<v-icon color="white"> mdi-cloud-upload </v-icon>
			</v-btn>
		</div>
		<keep-alive>
			<vue-tree
				style="width: 80vw; height: 90vh;"
				:dataset="dialog"
				:config="treeConfig"
				linkStyle="straight"
				direction="vertical"
				:collapse-enabled="true"
				ref="tree"
				:key="treeConfig.forceUpdateKey"
			>
				<template v-slot:node="{ node, collapsed }">
					<v-card
						class="mx-6"
						min-width="400"
						outlined
						shaped
						:color="`${
							node.children
								? node.children.length
									? 'grey lighten-4'
									: ''
								: 'grey lighten-4'
						}`"
						:style="{ border: collapsed ? '2px solid grey' : '' }"
					>
						<v-list-item three-line class="body-card">
							<v-list-item-content>
								<v-list-item-title class="head-textarea text-h1 mb-1">
									<v-textarea
										clear-icon="mdi-close-circle"
										spellcheck="false"
										no-resize
										auto-grow
										rows="1"
										v-model="node.name"
										@click.stop=""
										@mousedown.stop=""
										style="
											font-size: 65px;
											font-weight: bold;
										"
									></v-textarea>
								</v-list-item-title>
								<v-list-item-subtitle class="body-textarea m-1">
									<v-textarea
										no-resize
										auto-grow
										spellcheck="false"
										rows="3"
										@click.stop=""
										@mousedown.stop=""
										style="font-size: 30px"
										v-model="node.description"
									></v-textarea>
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>

						<v-card-actions>
							<v-spacer></v-spacer>

							<v-btn
								@click.stop="deleteNode(dialog, node.id)"
								dark
								text
								color="error"
								rounded
							>
								<v-icon large dark>mdi-minus</v-icon>
							</v-btn>

							<v-btn
								@click.stop="addNode(node)"
								dark
								text
								color="success"
								large
								class="rounded-plus"
							>
								<v-icon x-large>mdi-plus</v-icon>
							</v-btn>
						</v-card-actions>
					</v-card>
				</template>
			</vue-tree>
		</keep-alive>
	</div>
</template>
<script>
export default {
	name: "treemap",
	data() {
		return {
			dialog: {
				id: 0,
				name: "вітаємо в службі підтримки дп «інфоресурс»! оберіть, що вас цікавить:",
				description: "",
				attachments: [],
				children: [
					{
						id: 1,
						name: "основні дати",
						description: "",
						attachments: [],
						children: [
							{
								id: 2,
								name: "1 липня",
								description: "реєстрація електронних кабінетів",
								attachments: [],
								children: [],
							},
							{
								id: 3,
								name: "14 липня",
								description: "прийом заяв розпочинається",
								attachments: [],
								children: [],
							},
							{
								id: 4,
								name: "16 липня о 18.00 год",
								description:
									"прийом заяв закінчується (за співбесідою, вступними іспитами, творчими конкурсами)",
								attachments: [],
								children: [],
							},
							{
								id: 5,
								name: "23 липня о 18.00 год",
								description:
									"прийом заяв закінчується (за результатами зно, а також іспитів та творчих конкурсів, які були складені з 01 по 13 липня)",
								attachments: [],
								children: [],
							},
							{
								id: 6,
								name: "1-13 липня (бюджет) 14-23 липня (додаткові сесії контракт)",
								description: "вступні іспити, творчі конкурси",
								attachments: [],
								children: [],
							},
							{
								id: 7,
								name: "17-19 липня (включно)",
								description: "співбесіди проводяться",
								attachments: [],
								children: [],
							},
							{
								id: 8,
								name: "не пізніше 12.00 20 липня",
								description:
									"оприлюдення списків осіб, рекомендованих до зарахування за співбесідою та квотою-2 на бюджет",
								attachments: [],
								children: [],
							},
							{
								id: 9,
								name: "до 10.00 23 липня",
								description:
									"подання заяви про зарахування та квотою-2 на бюджет",
								attachments: [],
								children: [],
							},
							{
								id: 10,
								name: "не пізніше 15.00 23 липня",
								description:
									"зарахування на бюджет та за квотою-2 на бюджет",
								attachments: [],
								children: [],
							},
							{
								id: 11,
								name: "не пізніше 28 липня",
								description:
									"оприлюднення списку рекомендованих на основі результатів зно, творчих конкурсів та вступних іспитів (у тому числі квоту-1, квоту-3, квоту-4)",
								attachments: [],
								children: [],
							},
							{
								id: 12,
								name: "до 18.00 02 серпня",
								description: "подання заяви про зарахування",
								attachments: [],
								children: [],
							},
							{
								id: 13,
								name: "9 серпня",
								description: "зарахування на бюджет",
								attachments: [],
								children: [],
							},
							{
								id: 14,
								name: "не пізніше 30 вересня",
								description: "зарахування контракт",
								attachments: [],
								children: [],
							},
							{
								id: 15,
								name: "не раніше 10 серпня",
								description:
									"надання рекомендацій до зарахування та оприлюднення списку рекомендованих на контракт",
								attachments: [],
								children: [],
							},
						],
					},
					{
						id: 16,
						name: "вибір спеціальності",
						description:
							"для початку радимо ознайомитись з інструкцією у розділі «відеороз’яснення». і введіть ключові слова для пошуку конкурсної пропозиції (освітній ступінь, спеціальність, спеціалізацію, регіон, назву закладу). для вибору перейдіть на сайт: https://vstup.edbo.gov.ua/offers",
						attachments: [],
						children: [],
					},
					{
						id: 18,
						name: "перевірити документ",
						description:
							"для пошуку документа в реєстрі заповніть необхідні поля. поле, що відмічено зірочкою, є обов'язковим. поля «прізвище», «ім’я», «по батькові», «серія» та «номер» документа заповнюються українською мовою згідно з їх написанням у документі: https://info.edbo.gov.ua/edu-documents/",
						attachments: [],
						children: [],
					},
					{
						id: 20,
						name: "інформаційні матеріали",
						description: "",
						attachments: [],
						children: [
							{
								id: 21,
								name: "як обрати спеціальність.",
								description:
									"ми покажемо, як максимально правильно оцінити свої шанси на вступ і обрати саме той заклад освіти, куди ви можете вступити з більшою ймовірністю: https://life.pravda.com.ua/columns/2021/04/28/244766/",
								attachments: [],
								children: [],
							},
							{
								id: 23,
								name: "покрокова інструкція (бакалавр).",
								description:
									"розбираємо типові помилки вступників попередніх років, статуси електронних заяв, як надсилати до приймальної комісії електронні копії документів для заразхування: https://life.pravda.com.ua/columns/2021/06/25/245263/",
								attachments: [],
								children: [],
							},
						],
					},
					{
						id: 25,
						name: "відеороз'яснення",
						description: "",
						attachments: [],
						children: [
							{
								id: 26,
								name: "про що курс",
								description: "https://youtu.be/fmytybxfnpa",
								attachments: [],
								children: [],
							},
							{
								id: 27,
								name: "як обрати спеціальність не виходячи з дому",
								description: "https://youtu.be/onsnz_4wp88",
								attachments: [],
								children: [],
							},
							{
								id: 28,
								name: "як визначитись з предметами зно",
								description: "https://youtu.be/jcpwmpnxjbw",
								attachments: [],
								children: [],
							},
							{
								id: 29,
								name: "що таке конкурсна пропозиція",
								description: "https://youtu.be/gnjvo1fihog",
								attachments: [],
								children: [],
							},
							{
								id: 30,
								name: "як розрахувати конкурсний бал",
								description: "https://youtu.be/s07fvrukzae",
								attachments: [],
								children: [],
							},
							{
								id: 31,
								name: "система коефіцієнтів",
								description: "https://youtu.be/juisfnzneqg",
								attachments: [],
								children: [],
							},
							{
								id: 32,
								name: "пріоритетність при поданні заяв",
								description: "https://youtu.be/ckvbpjp32wg",
								attachments: [],
								children: [],
							},
							{
								id: 33,
								name: "алгоритм розміщення державного замовлення",
								description: "https://youtu.be/w8__zgll_-y",
								attachments: [],
								children: [],
							},
							{
								id: 34,
								name: "пільгові категорії вступників",
								description: "https://youtu.be/6svdo2v4y38",
								attachments: [],
								children: [],
							},
							{
								id: 35,
								name: "що таке мотиваційний лист",
								description: "https://youtu.be/ms-oogedg4m",
								attachments: [],
								children: [],
							},
						],
					},
					{
						id: 36,
						name: "нормативні документи",
						description: "",
						attachments: [],
						children: [
							{
								id: 37,
								name: "зу про освіту",
								description:
									"https://zakon.rada.gov.ua/laws/show/2145-19#text",
								attachments: [],
								children: [],
							},
							{
								id: 38,
								name: "зу про професійну (професійно-технічну) освіту",
								description:
									"https://zakon.rada.gov.ua/laws/show/103/98-вр#text%20",
								attachments: [],
								children: [],
							},
							{
								id: 39,
								name: "зу про фахову передвищу освіту",
								description:
									"https://zakon.rada.gov.ua/laws/show/2745-19#text%20",
								attachments: [],
								children: [],
							},
							{
								id: 40,
								name: "зу про вищу освіту",
								description:
									"https://zakon.rada.gov.ua/laws/show/1556-18%20#text",
								attachments: [],
								children: [],
							},
							{
								id: 41,
								name: "умови прийому на навчання для здобуття вищої освіти в 2021 році",
								description:
									"https://zakon.rada.gov.ua/laws/show/z1225-20#text",
								attachments: [],
								children: [],
							},
							{
								id: 42,
								name: "умови  прийому на навчання до закладів фахової передвищої освіти в 2021 році",
								description:
									"https://zakon.rada.gov.ua/laws/show/z1235-20#text",
								attachments: [],
								children: [],
							},
						],
					},
					{
						id: 43,
						name: "q&a",
						description: "",
						attachments: [],
						children: [
							{
								id: 44,
								name: "порядок надання технічної та інформаційної підтримки для користувачів єдебо",
								description:
									"https://www.inforesurs.gov.ua/edebo/faq/",
								attachments: [],
								children: [],
							},
						],
					},
					{
						id: 45,
						name: "звернутись у службу підтримки",
						description: "vstup@inforesurs.gov.ua",
						attachments: [],
						children: [],
					},
				],
				identifier: "id",
			},
			currentScale: 1,
			treeConfig: {
				nodeWidth: 600,
				nodeHeight: 400,
				levelHeight: 1200,
				forceUpdateKey: 0,
			},
			loading: false,
		};
	},

	mounted: function () {
		this.$nextTick(() => {
			this.$refs.tree.setScale(0.4);
		});
		this.$refs.tree.setScale(0.4);
	},

	methods: {
		zoomOut: function () {
			this.$refs.tree.zoomOut();
			this.currentScale = this.$refs.tree.currentScale;
		},
		zoomIn: function () {
			this.$refs.tree.zoomIn();
			this.currentScale = this.$refs.tree.currentScale;
		},
		restore: function () {
			this.$refs.tree.setScale(0.4);
			this.currentScale = this.$refs.tree.currentScale;
		},

		zoomWheel: function (e) {
			return e.deltaY > 0 ? this.zoomOut() : this.zoomIn();
		},

		getIncId(tree) {
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
		},
		deleteNode(tree, id) {
			function recurSearch(nodes) {
				nodes.children = nodes.children?.filter((childNode) => {
					if (childNode.children?.length) {
						recurSearch(childNode);
					}
					return childNode.id !== id;
				});
			}
			recurSearch(tree);
			this.$refs.tree.draw();
		},

		addNode(node) {
			const defaultNode = {
				id: this.getIncId(this.dialog.children),
				name: "",
				description: "",
				attachments: [],
				children: [],
			};

			node.children.push(defaultNode);
			this.treeConfig.forceUpdateKey += 1; // IDK why not working((((

			this.$refs.tree.draw();
			
			this.$nextTick(() => {
				this.$refs.tree.setScale(this.currentScale);
				console.log(this.$refs.tree);
			});
		},

		saveDialog() {
			this.loading = true;
			setTimeout(() => (this.loading = false), 2000);
			// axios.patch('/saveDialog',this.dialog);
		},
	},
};
</script>


<style lang="scss">
$primary: #11998e;
$secondary: #38ef7d;
$white: #fff;
$gray: #9b9b9b;

.rounded-plus {
	border-radius: 10px 1px 10px 1px;
}

.group-button {
	position: absolute;
	margin: 35px;
	z-index: 2;
}
.body-textarea .v-textarea textarea {
	line-height: 60px !important;
	font-family: 'Lucida Sans Unicode', sans-serif;
}

.head-textarea .v-textarea textarea {
	line-height: 60px !important;
	font-family: 'Сomic Sans MS', cursive;
}
.wrap {
	margin: 5px 30px auto;
}
</style>