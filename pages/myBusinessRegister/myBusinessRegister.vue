<template>
	<view class="pub_editInfor">
		<view class="item">
			<view class="name">姓名</view>
			<view class="rr">
				<input type="text" placeholder="请输入姓名"/>
			</view>
		</view>
		<view class="item">
			<view class="name">登录手机号</view>
			<view class="rr">
				<input type="number" maxlength="11" placeholder="请输入手机号"/>
			</view>
		</view>
		<view class="item">
			<view class="name">登录密码</view>
			<view class="rr">
				<input type="password" maxlength="" placeholder="请输入登录密码"/>
			</view>
		</view>
		<view class="item">
			<view class="name">验证码</view>
			<view class="rr pr">
				<input type="number" placeholder="请输入验证码"/>
				<view class="yzmBtn">获取验证码</view>
			</view>
		</view>
		<view class="item">
			<view class="name">主营商品</view>
			<view class="rr">
				<input type="text" placeholder="请输入主营商品"/>
			</view>
		</view>
		<view class="item">
			<view class="name">选择地址</view>
			<view class="rr pr">
				<input type="text" placeholder="请选择"/>
				<view class="arrow"><image src="../../static/images/case-icon1.png" mode=""></image></view>
			</view>
		</view>
		<view class="item">
			<view class="name">邀请码</view>
			<view class="rr">
				<input type="text" placeholder="请输入邀请码"/>
			</view>
		</view>
		<view class="submitbtn" style="margin: 200rpx auto">
			<button type="submit" style="margin-bottom: 20rpx;">确定</button>
			<view class="agreeSel" @click="xieyiAlert">
				<view class="selt" >
					<image src="../../static/images/about-address-icon4.png" mode=""></image>
				</view>
				<view class="text">同意《能工小匠》入驻协议</view>
			</view>
		</view>
		<view class="xieyiAlert" v-if="is_show">
			<view class="infor">
				<view class="colseBtn"  @click="xieyiAlert" style="top: auto;bottom: 60rpx;">×</view>
				<view class="cont">
					<view class="tit">入驻协议</view>
					<view>一、标题标题标题标题标题标题标题</view>
					<view>2、内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容</view>
					<view>2、内容内容内容内容内容内容内容内容内容内容内容内容内容内容</view>
					<view>3、内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容内容内容内容内容内容</view>
					<view>4、内容内容内容内容内容内容内容容内容内容内容内容内容内容</view>
					<view>5、内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容内容内容内容内容内容内容内容内容内容内容</view>
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
</style>

 
