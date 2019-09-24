<template>
	<view>
		<view class="caseSbmit">
			<form action="">
				<view class="eidt-line">
					<view class="ll">所在城市：</view>
					<view class="rr">
						<input type="text" placeholder="请选择">
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">面积：</view>
					<view class="rr">
						<input type="number" placeholder="请输入项目面积">
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">用工类型：</view>
					<view class="rr styleLis">
						<view class="item" v-for="(item,index) in styleLis" :key="index">
							<view class="icon"><image src="../../static/images/about-address-icon4.png" alt=""/></view>
							<view class="tit">{{item}}</view>
						</view>
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">地址：</view>
					<view class="rr">
						<input type="text" placeholder="请输入详细地址" >
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">手机号码：</view>
					<view class="rr">
						<input type="number" placeholder="请输入手机号码" maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')" >
					</view>
				</view>
				<view class="submitbtn" style="margin: 200rpx auto">
					<button type="submit" style="margin-bottom: 20rpx;">立即发布</button>
					<view class="agreeSel" @click="xieyiAlert">
						<view class="selt" >
							<image src="../../static/images/about-address-icon4.png" mode=""></image>
						</view>
						<view class="text">《同意服务须知协议》</view>
					</view>
				</view>
			</form>
		</view>
		<view class="xieyiAlert" v-if="is_show">
			<view class="infor">
				<view class="colseBtn"  @click="xieyiAlert" style="top: auto;bottom: 60rpx;">×</view>
				<view class="cont">
					<view class="tit">服务须知</view>
					<view>1、内容内容内容内容内容内容内容内容内容内容内容</view>
					<view>2、内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容</view>
					<view>3、内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容内容内容内容内容内容</view>
					<view>4、内容内容内容内容内容内容内容容内容内容内容内容内容内容</view>
					<view>5、内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容内容内容内容内容内容内容内容内容内容内容</view><view>1、内容内容内容内容内容内容内容内容内容内容内容</view>
					<view>6、内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容</view>
					<view>7、内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容内容内容内容内容内容</view>
					<view>8、内容内容内容内容内容内容内容容内容内容内容内容内容内容</view>
					<view>9、内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容内容内容内容内容内容内容内容内容内容内容</view>
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
				showView: false,
				score:'',
				wx_info:{},
				is_show:false,
				styleLis:['建筑工','装修工','维修工','园林工','市政工','维修工','其他']
			}
		},
		onLoad() {
			const self = this;
			//self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			xieyiAlert(){
				const self = this;
				self.is_show=!self.is_show;
			},
			getMainData() {
				const self = this;
				console.log('852369')
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';

				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.mainData = res.info.data;
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getMainData');

				};
				self.$apis.orderGet(postData, callback);

			},

		},
	};
</script>

<style>
	@import "../../assets/style/user.css";
	
	.styleLis{ width: 100%; display: flex; flex-wrap: wrap;justify-content: flex-end;}
	.styleLis .item{padding:0rpx 0 10rpx 30rpx;display: flex;justify-content: flex-end; align-items: center;}
	.styleLis .item .icon{  width: 36rpx;height: 36rpx; margin-right: 10rpx;font-size: 26rpx;}
	.styleLis .item .icon image{width: 100%;height: 100%; display: block;}
	

</style> 
