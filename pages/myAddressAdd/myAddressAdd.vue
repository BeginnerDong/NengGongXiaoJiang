<template>
	<view class="">
		<view class="caseSbmit">
			<view class="eidt-line">
				<view class="ll">收货人</view>
				<view class="rr">
					<input type="text" placeholder="请输入真实姓名" v-model="submitData.name">
				</view>
			</view>	
			<view class="eidt-line">
				<view class="ll">手机号码</view>
				<view class="rr" >
					<input style="text-align: right;" type="number" placeholder="+86" v-model="submitData.phone">
				</view>
			</view>	
			<view class="eidt-line">
				<view class="ll">所在地区</view>
				<view class="rr" @click="showMulLinkageThreePicker">
					{{submitData.city==''?'请选择地区':submitData.city}}
					<!-- <input style="text-align: right;" type="text" placeholder="选择省市区"> -->
				</view>
			</view>	
			<view class="eidt-line" style="min-height: 100rpx; height: auto;">
				<view class="ll">详细地址</view>
				<view class="rr" >
					<textarea class="textarea"  bindblur="bindTextAreaBlur"  placeholder="如街道/门牌号" v-model="submitData.detail"></textarea>
				</view>
			</view>	
			<view class="eidt-line">
				<view class="ll" style="width: 50%;">设为默认地址</view>
				<view class="rr" style="width:50%;text-align: right">
					<switch @change="choose" :checked="submitData.isdefault==1?true:false" color="#FFCB1E"></switch>
					<!-- <img v-if="!is_show" class="mmIcon" src="../../static/images/address-icon03.png" alt="">
					<img v-if="is_show" class="mmIcon" src="../../static/images/address-icon02.png" alt=""> -->
				</view>
			</view>	
			
			<view class="submitbtn" @click="Utils.stopMultiClick(submit)"  style="margin-top: 200rpx;">
				<button type="button">保存</button>
			</view>
			<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
			 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
		</view>
	</view>
</template>

<script>
	import mpvuePicker from '../../components/mpvue-picker/mpvuePicker.vue';
	// https://github.com/zhetengbiji/mpvue-citypicker
	import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '../../common/city.data.js';

	export default {
		components: {
			mpvuePicker,
			mpvueCityPicker
		},
		
		
		data() {
			return {
				submitData: {
					name: '',
					city: '',
					detail: '',
					isdefault:0
				},
				
				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 0],
				themeColor: '#F98A48',
				Utils:this.$Utils,
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray:[],
				
			}
		},
		onLoad(options) {
			const self = this;
			if(options.id){
				self.id = options.id;
				var res = self.$Token.getProjectToken(function(){
					self.$Utils.loadAll(['getMainData'], self)
				});
				if(res){
					self.$Utils.loadAll(['getMainData'], self)
				};
			}
		},
		
		methods: {
			
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				
				this.submitData.city = e.label;
				console.log('e',e)
			},
			onCancel(e){
				console.log('e',e)
			},
			
			
			
			choose(e) {
				const self = this;
				if(e.target.value){
					self.submitData.isdefault = 1
				}else{
					self.submitData.isdefault = 0
				}
				console.log('switch2 发生 change 事件，携带值为', e.target.value)
			},

			getMainData(id) {
				const self = this;
				const postData = {};
				postData.searchItem = {};
				postData.searchItem.id = self.id;
				postData.tokenFuncName = 'getProjectToken';

				const callback = (res) => {
					console.log(res);
					
					self.submitData.name = res.info.data[0].name;
					self.submitData.detail = res.info.data[0].detail;
					self.submitData.city = res.info.data[0].city;
					self.submitData.phone = res.info.data[0].phone;
					self.submitData.isdefault = res.info.data[0].isdefault;
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.addressGet(postData, callback);
			},



			addressUpdate() {
				const self = this;
				const postData = {};

				postData.tokenFuncName = 'getProjectToken';

				postData.searchItem = {};
				postData.searchItem.id = self.id;
				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);

				const callback = (data) => {
					uni.setStorageSync('canClick', true);
					if (data && data.solely_code == 100000) {
						self.$Utils.showToast('修改成功','success');
						self.$Router.redirectTo({route:{path:'/pages/myAddress/myAddress'}})
					} else {
						self.$Utils.showToast(data.msg,'error')
					};
					
				};
				self.$apis.addressUpdate(postData, callback);
			},


			addressAdd() {
				const self = this;
				const postData = {};

				postData.tokenFuncName = 'getProjectToken';

				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);

				const callback = (data) => {
					uni.setStorageSync('canClick', true);
					if (data && data.solely_code == 100000) {
						self.$Utils.showToast('添加成功','success');
						self.$Router.redirectTo({route:{path:'/pages/myAddress/myAddress'}})
					} else {
						self.$Utils.showToast(data.msg,'success')
					}
					
				};
				self.$apis.addressAdd(postData, callback);
			},


			submit() {
				const self = this;
				
				var phone = self.submitData.phone;
				const pass = self.$Utils.checkComplete(self.submitData);

				console.log('self.data.sForm', self.submitData)
				console.log('pass', pass)
				if (pass) {
					
					if (self.id) {

						self.addressUpdate();
					} else {

						self.addressAdd();
					}

			
				} else {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请补全信息','success');
				};
			},

		}
	}
</script>

<style>
	@import "../../assets/style/caseSbmit.css";
	
	.mmIcon{width: 100rpx;height: 42rpx;display: inline-block;}
</style>
