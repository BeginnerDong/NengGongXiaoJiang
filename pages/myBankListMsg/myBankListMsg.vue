<template>
	<view>
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">银行卡属性</view>
		</view>
		<view class="flexRowBetween r-selt mglr4" style="padding: 30rpx 0;border-bottom: 2rpx solid #e7e7e7;">
			<view class="selt"  @click="change('1')">
				<image :src="curr==1?'../../static/images/case-icon2.png':'../../static/images/case-icon3.png'" mode=""></image>法人对私银行账户
			</view>
			<view class="selt"  @click="change('2')">
				<image :src="curr==2?'../../static/images/case-icon2.png':'../../static/images/case-icon3.png'" mode=""></image>对公银行账户
			</view>
		</view>
		<view class="caseSbmit">
			<form action="">
				<view class="eidt-line">
					<view class="ll">银行开户名</view>
					<view class="rr">
						<input type="text" placeholder="请输入银行卡卡户名">
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">选择银行：</view>
					<view class="rr styleLis" style="text-align: right;color: #666;">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input">{{array[index]}}</view>
						</picker>
					</view>
				</view>
				
				<view class="eidt-line">
					<view class="ll">银行卡卡号：</view>
					<view class="rr">
						<input type="number" placeholder="请输入银行卡卡号" >
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">手机号码：</view>
					<view class="rr">
						<input type="number" placeholder="请输入联系电话" maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')" >
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">验证码：</view>
					<view class="rr pr flex">
						<view class="yam" style="width: 50%;">
							<input type="number" placeholder="请输入验证码" maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')" >
						</view>
						<view class="yzmBtn" >获取验证码</view>
					</view>
				</view>
				
				<view class="submitbtn" style="margin: 200rpx auto">
					<button type="submit">保存</button>
				</view>
			</form>
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
				is_show:false,
				index: 0,
				curr:1,
				array:['中国银行','工商银行','招商银行','广大银行','浦发银行']
			}
		},
		onLoad() {
			const self = this;
			//self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			change(curr){
				const self=this
				if(curr!=self.curr){
					self.curr=curr
				}
			},
			bindPickerChange(e) {
				// 搜索选择分类
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
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
	
	.caseSbmit .eidt-line .ll{ width: 30%;}
	.caseSbmit .eidt-line .rr{ width: 70%;}
	/* .styleLis{ width: 100%; display: flex; flex-wrap: wrap;justify-content: flex-end;}
	.styleLis .item{padding:0rpx 0 10rpx 30rpx;display: flex;justify-content: flex-end; align-items: center;}
	.styleLis .item .icon{  width: 36rpx;height: 36rpx; margin-right: 10rpx;font-size: 26rpx;}
	.styleLis .item .icon image{width: 100%;height: 100%; display: block;} */
	.r-selt .selt{ width: 50%; justify-content: flex-start;}
	

</style> 
