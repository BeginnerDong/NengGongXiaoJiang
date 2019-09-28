<template>
	<view class="pub_editInfor">
		<view class="item">
			<view class="name">姓名</view>
			<view class="rr">
				<input type="text" placeholder="请输入姓名" v-model="submitData.name"/>
			</view>
		</view>
		<view class="item">
			<view class="name">登录手机号</view>
			<view class="rr">
				<input type="number" maxlength="11" placeholder="请输入手机号" v-model="submitData.phone"/>
			</view>
		</view>
		<view class="item">
			<view class="name">登录密码</view>
			<view class="rr">
				<input type="password"  placeholder="请输入登录密码" v-model="submitData.password"/>
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
				<input type="text" placeholder="请输入主营商品" v-model="submitData.description"/>
			</view>
		</view>
		<view class="item">
			<view class="name">选择地址</view>
			<view class="rr pr">
				<view style="width: 50%;" @click="showMulLinkageThreePicker">
					<input type="text" placeholder="请选择地址" :value="submitData.address" disabled="true">
				</view>
				<view class="arrow"><image src="../../static/images/case-icon1.png" mode=""></image></view>
			</view>
		</view>
		<view class="item">
			<view class="name">邀请码</view>
			<view class="rr">
				<input type="text" placeholder="请输入邀请码" v-model="submitData.code"/>
			</view>
		</view>
		<view class="submitbtn" style="margin: 200rpx auto">
			<button type="submit" style="margin-bottom: 20rpx;" @click="Utils.stopMultiClick(submit)">确定</button>
			<view class="agreeSel">
				<view class="selt" @click="agree">
					<image :src="isAgree?'../../static/images/about-address-icon1.png':'../../static/images/about-address-icon4.png'" mode=""></image>
				</view>
				<view class="text"  @click="xieyiAlert">同意《能工小匠》入驻协议</view>
			</view>
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
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		         @="" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '@/common/city.data.js';
	export default {
		components: {	
			mpvueCityPicker
		},
		data() {
			return {
				Router:this.$Router,
				Utils:this.$Utils,
				submitData:{
					name:'',
					address:'',
					phone:'',
					password:'',
					code:'',	
					user_type:1,
					thirdapp_id:2,
					identity:3,
					description:''
				},
				index: 0,
				numb: 0,
				is_show:false,
				workArray:[],
				workStyleArray:[],		
				designStyleArray:[],
				type:'',
				searchItem:{},
				workIndex:'',
				workStyleIndex:'',
				designStyleIndex:'',
				isAgree:false,
				artData:{},
				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray:[]
			}
		},
		onLoad(options) {
			const self = this;
			self.type=options.type;	
			
			self.$Utils.loadAll(['getArtData'], self);
		},
		
		methods: {
			
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			
			onConfirm(e) {
				const self = this;
				console.log(e)
				self.submitData.address = e.label
			},
			
			submit() {
				const self = this;
				uni.setStorageSync('canClick', false);
				var phone = self.submitData.phone;
				var newObject = self.$Utils.cloneForm(self.submitData);
				delete newObject.code;
				const pass = self.$Utils.checkComplete(newObject);
				console.log('pass', pass);
				console.log('self.submitData',self.submitData)
				if (pass) {
					if(!self.isAgree){
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast('请阅读协议并同意', 'none')	
						return
					};
									
					if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast('手机格式不正确', 'none')			
					} else {					
						self.register();					
					}
				} else {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请补全信息', 'none')
				};
			},
			
			register() {
				const self = this;
				const postData = {};
				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);
				const callback = (data) => {				
					if (data.solely_code == 100000) {					
						self.$Utils.showToast('注册成功', 'none');
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 800);
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(data.msg, 'none', 1000)
					}	
				};
				self.$apis.register(postData, callback);
			},
			
			agree(){
				const self = this;
				self.isAgree = !self.isAgree
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
							title: ['=', ['入驻协议']],
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
			
			
			
			xieyiAlert(){
				const self = this;
				self.is_show=!self.is_show;
			},
			
			
		},
	};
</script>
<style>
	@import "../../assets/style/user.css";
</style>

 
