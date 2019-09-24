<template>
	<view>
		<view class="caseSbmit">
			<form action="">
				<view class="eidt-line">
					<view class="ll">姓名：</view>
					<view class="rr">
						<input type="text" placeholder="请输入姓名">
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">性别：</view>
					<view class="flexRowBetween r-selt">
						<view class="selt"  @click="change('1')" style="justify-content: flex-end;">
							<image :src="curr==1?'../../static/images/case-icon2.png':'../../static/images/case-icon3.png'" mode=""></image>男
						</view>
						<view class="selt"  @click="change('2')" style="justify-content: flex-end;">
							<image :src="curr==2?'../../static/images/case-icon2.png':'../../static/images/case-icon3.png'" mode=""></image>女
						</view>
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">电话：</view>
					<view class="rr">
						<input type="number" placeholder="请输入联系方式" maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')" >
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">年龄：</view>
					<view class="rr styleLis pr" style="padding-right: 30rpx;">
						<view style="width: 100%; color: grey;font-size: 24rpx;text-align: right;">
							<picker @change="bindPickerChange" :value="index" :range="array" style="width: 100%;">
								<view class="uni-input">{{array[index]}}</view>
							</picker>
						</view>
						<view class="arrow" style="position: absolute;top: 50%;right:0rpx; transform: translateY(-50%);">
							<image class="arrow" src="../../static/images/case-icon1.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">身份证号：</view>
					<view class="rr">
						<input type="text" placeholder="请输入身份证号" >
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
				Router:this.$Router,
				showView: false,
				score:'',
				wx_info:{},
				is_show:false,
				index: 0,
				curr:1,
				array:['请选择','18','19','20','21','22']
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


</style> 
