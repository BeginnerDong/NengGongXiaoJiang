<template>
	<view>
		<view class="caseSbmit">
			<form action="">
				<view class="eidt-line">
					<view class="ll">选择工种</view>
					<view class="rr pr" style="padding-right: 20rpx;">
						<picker :value="index" :range="array"  @change="bindPickerChange">
							<view class="uni-input">{{array[index]?array[index]:'请选择'}}</view>
						</picker>
						<image class="arrow" src="../../static/images/case-icon1.png" mode=""></image>
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">标题</view>
					<view class="rr">
						<input type="text" value="标题提标题提标题提" placeholder="请输入标题" v-model="submitData.title"/>
					</view>
				</view>
				
				<view class="eidt-column">
					<view class="ll">详情介绍</view>
					<view class="">
						<textarea v-model="submitData.description" placeholder="请简单的介绍下案例详情" />
					</view>
				</view>
				<view class="eidt-column">
					<view class="ll">上传图片</view>
					<view class="rr upBook">
						<image class="bookPic" v-for="item in submitData.mainImg" v-if="submitData.mainImg.length>0" :src="item.url" mode=""></image>
						<image class="bookPic" @click="upLoadImg()" v-if="submitData.mainImg.length<6" src="../../static/images/case-img.png" mode=""></image>
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">显示状态</view>
					<view class="rr">
						<view class="flexRowBetween r-selt" style="padding-bottom: 30rpx;">
							<view class="selt"  @click="change('1')">
								<image :src="submitData.behavior==1?'../../static/images/case-icon2.png':'../../static/images/case-icon3.png'" mode=""></image>显示
							</view>
							<view class="selt"  @click="change('0')">
								<image :src="submitData.behavior==0?'../../static/images/case-icon2.png':'../../static/images/case-icon3.png'" mode=""></image>隐藏
							</view>
						</view>
					</view>
				</view>
			</form>
		</view>
		<view class="submitbtn" style="margin: 100rpx auto">
			<button type="submit" @click="Utils.stopMultiClick(submit)">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				
				curr:1,
				index:'',
				array:['建筑工','装修工','维修工','园林工','市政工','安装工','其他'],
				submitData:{
					class:'',
					title:'',
					description:'',
					mainImg:'',
					behavior:'',
				}
			}
		},
		onLoad() {
			const self = this;
			//self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			
			bindPickerChange(e) {
				const self=this;
				console.log('picker发送选择改变，携带值为', e.target.value)
				self.index = e.target.value;
				self.submitData.class=self.array[self.index]
			},
			
			change(curr){
				const self=this
				if(curr!=self.submitData.behavior){
					self.submitData.behavior=curr
				}
			},
			
			upLoadImg() {
				const self = this;			
				wx.showLoading({
					mask: true,
					title: '上传中',
				});
				const callback = (res) => {
					console.log('res', res)
					if (res.solely_code == 100000) {
						
						self.submitData.mainImg.push({
							url:res.info.url,
							type:'image'
						})
						console.log(self.submitData)
						wx.hideLoading()
					} else {
						self.$Utils.showToast('网络故障', 'none')
					}
				};				
				wx.chooseImage({
					count: 1,
					success: function(res) {
						console.log(res);
						var tempFilePaths = res.tempFilePaths[0];
						console.log(callback)
						self.$Utils.uploadFile(tempFilePaths, 'file', {
							tokenFuncName: 'getProjectToken',
							type:'image'
						}, callback)
					},
					fail: function(err) {
						wx.hideLoading();
					},			
				})			
			},
			
			submit() {
				const self = this;
				uni.setStorageSync('canClick', false);	
				const pass = self.$Utils.checkComplete(self.submitData);
				console.log('pass', pass);
				console.log('self.submitData',self.submitData)
				if (pass) {			
					self.messageAdd();	
				} else {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请补全信息', 'none')
				};
			},
			
			messageAdd() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getThreeToken';
				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);
				const callback = (data) => {				
					if (data.solely_code == 100000) {					
						self.$Utils.showToast('添加成功', 'none');
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 800)
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(data.msg, 'none', 1000)
					}	
				};
				self.$apis.messageAdd(postData, callback);
			},

		},
	};
</script>

<style>
	@import "../../assets/style/caseSbmit.css";
	
	.rr{ justify-content:flex-end; display:flex ; text-align: right; align-items: center; }
	.eidt-column{padding: 30rpx 4% ; border-bottom: 1px solid #e7e7e7;}
	.eidt-column .ll{padding-bottom: 20rpx;}
	textarea{ width: 100%;height: 300rpx; display: block; box-sizing: border-box; font-size: 26rpx; line-height: 44rpx;padding: 20rpx;background: #F5F5F5;}
	.upBook{ display: flex;justify-content: flex-start; flex-wrap: wrap;}
	.upBook image{width: 150rpx; height: 150rpx; margin-right: 20rpx;}
	.bookPic{width: 150rpx; height: 150rpx; }
	</style> 
</style> 
