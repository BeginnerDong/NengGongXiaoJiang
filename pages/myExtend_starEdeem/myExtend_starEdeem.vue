<template>
	<view>
		<view class="">
			<view class="postersbox center" style="width: 100%;">
				<image class="pic" :src="artData.mainImg&&artData.mainImg[0]?artData.mainImg[0].url:''" mode=""></image>
				<view class="infor">
					<view class="red font24">{{code}}</view>
					<view class="copyBtn font14" @click="copy">复制</view>
				</view>
				<view class="textB" @click="xieyiAlert">《推广说明》</view>
			</view>
			<view class="xieyiAlert" v-if="is_show">
				<view class="infor">
					<view class="colseBtn"  @click="xieyiAlert" style="top: auto;bottom: 60rpx;">×</view>
					<view class="cont">
						<view class="tit">{{artData.title}}</view>
						<view class="content ql-editor" v-html="artData.content">
						</view>
					</view>	
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				
				is_show:false,
				artData:{},
				code:''
			}
		},
		onLoad(options) {
			const self = this;
			if(options.type){
				self.code = uni.getStorageSync('user_info').code
			}else{
				self.code = uni.getStorageSync('threeInfo').code
			}
			self.$Utils.loadAll(['getArtData'], self);
		},
		methods: {
			
			copy(){
				const self = this;
				uni.setClipboardData({
				    data: self.code,
				    success: function () {
				        //	self.$Utils.showToast('复制成功', 'none')
				    }
				});
			},
			
			
			xieyiAlert(){
				const self = this;
				self.is_show=!self.is_show;
			},
			
			getArtData() {
				const self = this;			
				const postData = {};
			
				postData.searchItem = {
					thirdapp_id:2,
				};
				postData.getBefore = {
					caseData: {
						tableName: 'Label',
						searchItem: {
							title: ['=', ['推广说明']],
						},
						middleKey: 'menu_id',
						key: 'id',
						condition: 'in',
					},
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.artData = res.info.data[0];
						const regex = new RegExp('<img', 'gi');
						self.artData.content = self.artData.content.replace(regex, `<img style="max-width: 100%;"`);
					}
					console.log('self.artData',self.artData)
					self.$Utils.finishFunc('getArtData');
				};
				self.$apis.articleGet(postData, callback);
			},

		},
	};
</script>

<style>
	@import "../../assets/style/user.css";
	.tooling_indNav .list .item{width: 50%; color: #222;}
	.postersbox{position: fixed;top: 0;left: 0;right: 0;bottom: 0;}
	.postersbox .pic{width: 100%; height: 100%; display: block;}
	.postersbox .infor{top: 43%;}
	.postersbox .infor .red{font-size: 52rpx; margin-bottom:26rpx;}
	.postersbox .copyBtn{width: 140rpx; height: 60rpx;line-height: 60rpx;border-radius: 8rpx;}
	.postersbox .textB{bottom:20rpx;font-size: 30rpx;padding: 20rpx;}
	

</style>
