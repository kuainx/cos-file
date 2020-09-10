<template>
	<div>
		<span>{{ file.name }} - {{ uploaded }}/{{ size }} - {{ percent }}%</span>
		<a-progress :percent="percent" :status="status"/>
	</div>
</template>
<script>
export default {
	name: "progressA",
	props: ["file"],
	data: () => ({
		status: "active",
	}),
	methods: {
		renderSize(value) {
			return window.renderSize(value);
		},
	},
	computed: {
		percent() {
			return Math.round(this.file.uploaded / this.file.size * 10000) / 100;
		},
		uploaded() {
			return this.renderSize(this.file.uploaded);
		},
		size() {
			return this.renderSize(this.file.size);
		},
	},
	watch: {
		percent() {
			if (this.percent === 100) {
				this.status = "success";
			}
		},
	},
};
</script>
<style lang="scss" scoped>
</style>
