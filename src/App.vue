<template>
	<div id="container">
		<div id="app">
			<Login class="margin-10"></Login>
			<FileList class="margin-10"></FileList>
			<Upload class="margin-10"></Upload>
		</div>
	</div>
</template>

<script>
import Login from "./components/Login";
import FileList from "./components/List";
import Upload from "./components/Upload";

export default {
	name: "App",
	data: () => ({}),
	components: {
		Login,
		FileList,
		Upload,
	},
};
</script>

<style>
#container {
	display: table;
	height: 100%;
	margin: auto;
	text-align: center;
}

#app {
	display: table-cell;
	vertical-align: middle;
}

.margin-10 {
	margin: 10px 0;
}

.padding-10 {
	padding: 10px;
}
</style>
