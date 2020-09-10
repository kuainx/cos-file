<template>
	<div>
		<a-button-group>
			<a-button>
				{{ file.Key }}
			</a-button>
			<a-button>
				{{ renderSize(file.Size) }}
			</a-button>
			<span class="ant-btn ant-btn-link" v-clipboard:copy="link" v-clipboard:success="onCopy" v-clipboard:error="onError"><a-icon type="copy"/></span>
			<a-button type="primary" @click="download">
				<a-icon type="cloud-download"/>
			</a-button>
			<a-button type="danger" @click="del">
				<a-icon type="delete"/>
			</a-button>
		</a-button-group>
	</div>
</template>

<script>
export default {
	name: "File",
	props: ["file"],
	computed: {
		link() {
			return "https://cloud-1252428915.cos.ap-guangzhou.myqcloud.com/" + this.file.Key;
		},
	},
	methods: {
		renderSize(e) {
			return window.renderSize(e);
		},
		onCopy() {
			this.$message.success("链接已复制到剪切板！");
		},
		onError() {
			this.$message.error("抱歉，链接复制失败！");
		},
		download() {
			let a = document.createElement("a");
			a.href = this.link;
			a.click();
		},
		del() {
			let that = this;
			window.cosA.deleteObject({
				Bucket: "cloud-1252428915",
				Region: "ap-guangzhou",
				Key: this.file.Key,
			}, function (err, data) {
				if (err) {
					that.$error({
						title: "网络错误",
						content: err.statusCode,
					});
				} else {
					that.$notification.success({
						message: "成功",
						description: "文件删除成功",
					});
				}
				console.log(err, data);
				window.refreshList();
			});
		},
	},
};
</script>

<style scoped>

</style>
