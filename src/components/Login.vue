<template>
	<div>
		<a-input v-model="user" placeholder="input username"/>
		<a-input-password v-model="pass" placeholder="input password" class="margin-10"/>
		<a-button type="primary" @click="getAuth">
			获取鉴权
		</a-button>
	</div>
</template>

<script>
import md5 from "md5";

export default {
	name: "Login",
	data: () => ({
		user: "",
		pass: "",
	}),
	computed: {
		auth() {
			return md5(this.user + this.pass);
		},
	},
	methods: {
		getAuth() {
			this.$axios.get("?_=" + this.auth)
				.then(response => {
					if (response.status === 200) {
						if (response.data.credentials) {
							window.credentials = response.data.credentials;
							this.$notification.success({
								message: "成功",
								description: "鉴权获取成功",
							});
						} else {
							this.$error({
								title: "失败",
								content: "鉴权错误，请检查配置",
							});
						}
					} else {
						this.$error({
							title: "网络错误",
							content: response.status + "：" + response.statusText,
						});
					}
					console.log(response);
				}).catch(error => {
				this.$error({
					title: "网络错误",
					content: error,
				});
				console.log(error);
			});
		},
	},

};
</script>

