<template>
	<view>
		<view class="detailxqBan">
			<image :src="mainData.mainImg[0].url" mode=""></image>
		</view>
		<view class="detailTit">
			<view class="tit" style="padding-bottom: 0;">{{mainData.title}}</view>
			<view class="house_idexLis" style="padding-top: 0;">
				<view class="adrs pr avoidOverflow">
					<image class="icon" src="../../static/images/home-housing-icon1.png" mode=""></image>
					{{mainData.address}}
				</view>
				<view class="adrs pr avoidOverflow">
					<image class="icon" src="../../static/images/home-housing-icon2.png" mode=""></image>
					{{mainData.contactPhone}}
				</view>
			</view>
		</view>
		
		<view class="f5H10"></view>
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">详情介绍</view>
		</view>
		<view class="xqInfor">
			<view class="content ql-editor" v-html="mainData.content">
			</view>

		</view>
		
	</view>

</template>


<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				
				
				mainData:{}
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
					id:self.id
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
	@import "../../assets/style/house_idexLis.css";
	@import "../../assets/style/quill.css";

</style>
