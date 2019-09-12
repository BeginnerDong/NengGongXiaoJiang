<template>
	<view class="">
		<view class="caseSbmit">
			<view class="eidt-line">
				<view class="ll">收货人</view>
				<view class="rr">
					<input type="text" placeholder="请输入真实姓名">
				</view>
			</view>	
			<view class="eidt-line">
				<view class="ll">手机号码</view>
				<view class="rr" >
					<input style="text-align: right;" type="number" placeholder="+86>">
				</view>
			</view>	
			<view class="eidt-line">
				<view class="ll">所在地区</view>
				<view class="rr" >
					<input style="text-align: right;" type="text" placeholder="选择省市区">
				</view>
			</view>	
			<view class="eidt-line" style="min-height: 100rpx; height: auto;">
				<view class="ll">详细地址</view>
				<view class="rr" >
					<textarea class="textarea"  bindblur="bindTextAreaBlur"  placeholder="如街道/门牌号"></textarea>
				</view>
			</view>	
			<view class="eidt-line">
				<view class="ll" style="width: 50%;">设为默认地址</view>
				<view class="rr" style="width:50%;text-align: right" @click="setDefault">
					<img v-if="!is_show" class="mmIcon" src="../../static/images/address-icon03.png" alt="">
					<img v-if="is_show" class="mmIcon" src="../../static/images/address-icon02.png" alt="">
				</view>
			</view>	
			
			<view class="submitbtn"  style="margin-top: 200rpx;">
				<button type="button">保存</button>
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
				is_show:false,
				score: '',
				wx_info: {}
			}
		},

		onLoad(options) {
			uni.setStorageSync('canClick', true);
		},

		onShow() {
			const self = this;
			document.title = ''
		},

		methods: {
			setDefault(){
				const self = this;
				self.is_show=!self.is_show
			},
			getMainData() {
				const self = this;
				self.$apis.userGet(postData, callback);
			}
		}
	}
</script>

<style>
	@import "../../assets/style/user.css";
	.mmIcon{width: 100rpx;height: 42rpx;display: inline-block;}
</style>
