<template>
	<div>
		<a-button type="primary" @click="showA">
			上传文件
		</a-button>
		<a-modal
				title="上传文件"
				:visible="show"
				:footer="null"
				:destroyOnClose="true"
				:closable="false"
		>
			<div v-show="current===0" class="box">
				<selector v-model="fileList"></selector>
				<a-button type="primary" @click="startUpload" class="margin-10">
					确认上传
				</a-button>
			</div>
			<div v-show="current===1">
				<div v-for="file in fileStatus" :key="file.name">
					<progressA :file="file"></progressA>
				</div>
			</div>
			<div class="right">
				<a-button type="primary" @click="close" class="margin-10" :loading="start">
					关闭
				</a-button>
			</div>
		</a-modal>
	</div>
</template>

<script>
import selector from "./selector";
import progressA from "./progressA";

export default {
	name: "Upload",
	data: () => ({
		current: 0,
		show: false,
		fileList: [],
		fileStatus: [],
		start: false,
	}),
	methods: {
		showA() {
			this.show = true;
			this.start = false;
		},
		close() {
			this.fileList = [];
			this.fileStatus = [];
			this.start = false;
			this.show = false;
		},
		startUpload() {
			let filename = [];
			for (let file of this.fileList) {
				if (filename.indexOf(file.name) !== -1) {
					this.$error({
						title: "提交失败",
						content: "错误信息：文件池中不得有重名文件",
					});
					return;
				} else {
					filename.push(file.name);
				}
			}
			this.current = 1;
			this.start = true;
			let that = this;
			for (let i = 0; i < this.fileList.length; i++) {
				let file = this.fileList[i];
				this.$set(this.fileStatus, i, {
					name: file.name,
					size: file.size,
					uploaded: 0,
				});
				window.cosA.putObject({
					Bucket: "cloud-1252428915",
					Region: "ap-guangzhou",
					Key: file.name,
					Body: file, // 上传文件对象
					onProgress: function (e) {
						console.log(e);
						that.fileStatus[i].uploaded = e.loaded;
					},
				}, function (err, data) {
					if (err) {
						that.$notification.error({
							title: "网络错误",
							content: "文件" + that.fileStatus[i].name + "错误" + err.statusCode,
						});
					} else {
						if (data.statusCode === 200 || data.statusCode === 206) {
							that.$notification.success({
								message: "成功",
								description: "文件" + that.fileStatus[i].name + "上传成功",
							});
						} else {
							that.$notification.error({
								title: "网络错误",
								content: "文件" + that.fileStatus[i].name + "错误" + data.statusCode,
							});
						}
					}
				});
			}
			setTimeout(this.check, 1000);
		},
		check() {
			if (!this || this._isDestroyed) {
				return;
			}
			let next = false;
			if (this.show) {
				for (let file of this.fileStatus) {
					if (file.size !== file.uploaded) {
						next = true;
						break;
					}
				}
				if (!next) {
					this.$success({
						title: "上传成功",
						content: this.fileStatus.length + " 个文件上传完成",
					});
					this.start = false;
					window.refreshList();
				} else {
					setTimeout(this.check, 2000);
				}
			}
		},
	},
	components: {
		selector,
		progressA,
	},
};
</script>

<style scoped>
.box {
	text-align: center;
}

.right {
	text-align: right;
}
</style>
