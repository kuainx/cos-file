<template>
	<div>
		<File v-for="(file,index) in fileList" :file="file" :key="index"></File>
		<a-button type="primary" @click="getFileList">
			刷新列表
		</a-button>
	</div>
</template>

<script>
import File from "./File";

export default {
	name: "List",
	data: () => ({
		fileList: [],
	}),
	methods: {
		getFileList() {
			let that = this;
			window.cosA.getBucket({
				Bucket: "cloud-1252428915",
				Region: "ap-guangzhou",
			}, function (err, data) {
				if (err) {
					that.$error({
						title: "网络错误",
						content: err.statusCode,
					});
				} else {
					that.fileList = data.Contents;
					that.$notification.success({
						message: "成功",
						description: "文件列表拉取成功",
					});
				}
				console.log(err, data);
			});
		},
	},
	mounted() {
		window.refreshList = this.getFileList;
	},
	components: {
		File,
	},
};
</script>

<style scoped>

</style>
