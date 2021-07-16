<template>
	<v-app id="inspire">
		<v-app id="inspire">
			<Header />
			<v-main>
					<router-view />
			</v-main>
		<Dialog />
		</v-app>
	</v-app>
</template>

<script>
import Dialog from '@/components/Dialog';
import Header from '@/components/Header';

export default {
	name: "App",
	components:{
		Dialog,
		Header,
	},
};
</script>


<style lang="scss">
a{
	text-decoration: none;
}
</style>
