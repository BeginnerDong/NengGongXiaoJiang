<template>
	<view>

		<view class="xqInfor" style="padding-top: 30rpx;">
			<view class="title">
				<view class="center font15">{{mainData.title}}</view>
				<view class="font13 color3" style="padding: 20rpx 0; text-align: right;">{{mainData.create_time}}</view>
			</view>
			<view class="content ql-editor" v-html="mainData.content">
			</view>
		</view>

	</view>

</template>


<script>
	export default {
		data() {
			return {
				Router: this.$Router,


				mainData: {}
			}
		},

		onLoad(options) {
			const self = this;
			self.id = options.id;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getMainData'], self);
		},

		methods: {

			getMainData() {
				const self = this;
				console.log('852369')
				const postData = {};
				postData.searchItem = {
					id: self.id
				}
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.mainData = res.info.data[0];

						const regex = new RegExp('<img', 'gi');
						self.mainData.content = self.mainData.content.replace(regex, `<img style="max-width: 100%;"`);
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.articleGet(postData, callback);
			},
		}
	}
</script>

<style>
	@import "../../assets/style/index.css";
	@import "../../assets/style/quill.css";
</style>
