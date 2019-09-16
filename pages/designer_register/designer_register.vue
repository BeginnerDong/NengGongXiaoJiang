<template>
	<view>
		<image class="lgoin-topBj" src="../../static/images/regietered-img1.png" mode=""></image>
		<view class="login-box">
			<view class="item">
				<view class="icon"><image src="../../static/images/regietered-icon8.png" mode=""></image></view>
				<view class="rr">
					<input type="text" placeholder="输入姓名">
				</view>
			</view>
			<view class="item">
				<view class="icon"><image src="../../static/images/regietered-icon7.png" mode=""></image></view>
				<view class="rr">
					<input type="number" placeholder="输入手机号码">
				</view>
			</view>
			<view class="item">
				<view class="icon"><image src="../../static/images/regietered-icon5.png" mode=""></image></view>
				<view class="rr pr flexRowBetween">
					<view style="width: 50%;">
						<input type="number" placeholder="输入验证码">
					</view>
					<view class="yzmBtn">获取验证码</view>
				</view>
			</view>
			<view class="item">
				<view class="icon"><image src="../../static/images/regietered-icon4.png" mode=""></image></view>
				<view class="rr pr flexRowBetween">
					<view style="width: 50%;">
						<input type="text" placeholder="请选择地址">
					</view>
					<view class="yzmBtn">
						<image class="arrow" src="../../static/images/case-icon1.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="icon"><image src="../../static/images/regietered-icon3.png" mode=""></image></view>
				<view class="rr">
					<input type="number" placeholder="请输入提升星级兑换码">
				</view>
			</view>
			<view class="item">
				<view class="icon"><image src="../../static/images/regietered-icon2.png" mode=""></image></view>
				<view class="rr flexRowBetween pr">
					<view style="width: 100%; color: grey;font-size: 24rpx;">
						<picker @change="workPickerChange" :value="numb" :range="workArray" style="width: 100%;">
							<view class="uni-input">{{workArray[numb]}}</view>
						</picker>
					</view>
					<view class="arrow" style="position: absolute;top: 50%;right:20rpx; transform: translateY(-50%);">
						<image class="arrow" src="../../static/images/case-icon1.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="icon"><image src="../../static/images/regietered-icon1.png" mode=""></image></view>
				<view class="rr flexRowBetween pr">
					<view style="width: 100%; color: grey;font-size: 24rpx;">
						<picker @change="bindPickerChange" :value="index" :range="array" style="width: 100%;">
							<view class="uni-input">{{array[index]}}</view>
						</picker>
					</view>
					<view class="arrow" style="position: absolute;top: 50%;right:20rpx; transform: translateY(-50%);">
						<image class="arrow" src="../../static/images/case-icon1.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		
		<view class="submitbtn" style="margin: 200rpx auto">
			<button type="submit" style="margin-bottom: 20rpx;" @click="webSelf.$Router.navigateTo({route:{path:'/pages/designer_login/designer_login'}})">注册</button>
			<view class="agreeSel" @click="xieyiAlert">
				<view class="selt" >
					<image src="../../static/images/about-address-icon4.png" mode=""></image>
				</view>
				<view class="text" style="margin-left: 10rpx;">同意《能工小匠》入驻协议</view>
			</view>
		</view>
		<!-- 入驻协议 -->
		<view class="xieyiAlert" v-if="is_show">
			<view class="infor">
				<view class="colseBtn"  @click="xieyiAlert" style="top: auto;bottom: 60rpx;">×</view>
				<view class="cont">
					<view class="tit">入驻协议</view>
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
				webSelf: this,
				showView: false,
				score:'',
				wx_info:{},
				index: 0,
				numb: 0,
				is_show:false,
				workArray:['请选择工种','建筑工','装修工','维修工','园林工','市政工','安装工'],
				array:['请选择设计类型','田园风','欧式风','简约风','北美风','其他']
			}
		},
		onLoad() {
			const self = this;
			//self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			workPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.numb = e.target.value
			},
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
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

</style> 
