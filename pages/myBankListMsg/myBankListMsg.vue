<template>
	<view>
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">银行卡属性</view>
		</view>
		<view class="flexRowBetween r-selt mglr4" style="padding: 30rpx 0;border-bottom: 2rpx solid #e7e7e7;">
			<view class="selt"  @click="change('1')">
				<image :src="submitData.type==1?'../../static/images/case-icon2.png':'../../static/images/case-icon3.png'" mode=""></image>法人对私银行账户
			</view>
			<view class="selt"  @click="change('2')">
				<image :src="submitData.type==2?'../../static/images/case-icon2.png':'../../static/images/case-icon3.png'" mode=""></image>对公银行账户
			</view>
		</view>
		<view class="caseSbmit">
			<form action="">
				<view class="eidt-line">
					<view class="ll">银行开户名</view>
					<view class="rr">
						<input type="text" placeholder="请输入银行卡卡户名" v-model="submitData.name">
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">选择银行：</view>
					<view class="rr styleLis" style="text-align: right;color: #666;">
						<picker @change="bindPickerChange" :value="index" :range="labelData" range-key="title">
							<view class="uni-input">{{labelData[index]&&labelData[index].title?labelData[index].title:'请选择'}}</view>
						</picker>
					</view>
				</view>
				
				<view class="eidt-line">
					<view class="ll">银行卡卡号：</view>
					<view class="rr">
						<input type="number" placeholder="请输入银行卡卡号" v-model="submitData.number">
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">手机号码：</view>
					<view class="rr">
						<input type="number" v-model="submitData.phone" placeholder="请输入联系电话" maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')" >
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
				<view class="eidt-line">
					<view class="ll" style="width: 50%;">设为默认银行卡</view>
					<view class="rr" style="width:50%;text-align: right">
						<switch @change="choose" :checked="submitData.isdefault==1?true:false" color="#FFCB1E"></switch>
						<!-- <img v-if="!is_show" class="mmIcon" src="../../static/images/address-icon03.png" alt="">
						<img v-if="is_show" class="mmIcon" src="../../static/images/address-icon02.png" alt=""> -->
					</view>
				</view>	
				<view class="submitbtn" style="margin: 200rpx auto">
					<button type="submit" @click="Utils.stopMultiClick(submit)">保存</button>
				</view>
			</form>
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
					number: '',
					phone: '',
					bank:'',
					type:'',
					isdefault:''
				},		
				index:'',
				labelData:[],
				Utils:this.$Utils
			}
		},
		onLoad(options) {
			const self = this;
			self.$Utils.loadAll(['getLabelData'], self)	
			if(options.id){
				self.id = options.id;
				self.getMainData()	
			}
		},
		
		methods: {
			
			bindPickerChange(e) {
				const self=this;
				console.log('picker发送选择改变，携带值为', e.target.value)
				self.index = e.target.value;
				self.submitData.bank=self.labelData[self.index].id
			},
			
			getLabelData() {
				const self = this;	
				const postData = {};	
				postData.searchItem = {
					thirdapp_id:2,	
				};
				postData.getBefore = {
					caseData: {
						tableName: 'Label',
						searchItem: {
							title: ['=', ['银行卡']],
						},
						middleKey: 'parentid',
						key: 'id',
						condition: 'in',
					},
				};
				postData.order = {
					create_time:'asc'
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.labelData.push.apply(self.labelData, res.info.data);
					}
					console.log('self.labelData',self.labelData)
					self.$Utils.finishFunc('getLabelData');
				};
				self.$apis.labelGet(postData, callback);
			},
				
			change(type){
				const self = this;
				if(self.submitData.type!=type){
					self.submitData.type = type
				}
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
				postData.tokenFuncName = 'getThreeToken';

				const callback = (res) => {
					console.log(res);
					
					self.submitData.name = res.info.data[0].name;
					self.submitData.number = res.info.data[0].number;
					self.submitData.phone = res.info.data[0].phone;
					self.submitData.type = res.info.data[0].type;
					self.submitData.isdefault = res.info.data[0].isdefault;
					for (var i = 0; i < self.labelData.length; i++) {
						if(self.labelData[i].id==res.info.data[0].bank){
							self.index = i
						}
					}
				};
				self.$apis.cardGet(postData, callback);
			},

			cardUpdate() {
				const self = this;
				const postData = {};

				postData.tokenFuncName = 'getThreeToken';

				postData.searchItem = {};
				postData.searchItem.id = self.id;
				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);

				const callback = (data) => {
					uni.setStorageSync('canClick', true);
					if (data && data.solely_code == 100000) {
						self.$Utils.showToast('修改成功','success');
						self.$Router.redirectTo({route:{path:'/pages/myBankList/myBankList'}})
					} else {
						self.$Utils.showToast(data.msg,'error')
					};
					
				};
				self.$apis.cardUpdate(postData, callback);
			},


			cardAdd() {
				const self = this;
				const postData = {};

				postData.tokenFuncName = 'getThreeToken';

				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);

				const callback = (data) => {
					uni.setStorageSync('canClick', true);
					if (data && data.solely_code == 100000) {
						self.$Utils.showToast('添加成功','success');
						self.$Router.redirectTo({route:{path:'/pages/myBankList/myBankList'}})
					} else {
						self.$Utils.showToast(data.msg,'success')
					}
					
				};
				self.$apis.cardAdd(postData, callback);
			},


			submit() {
				const self = this;
				
				var phone = self.submitData.phone;
				const pass = self.$Utils.checkComplete(self.submitData);

				console.log('self.data.sForm', self.submitData)
				console.log('pass', pass)
				if (pass) {
					
					if (self.id) {

						self.cardUpdate();
					} else {

						self.cardAdd();
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
	@import "../../assets/style/user.css";
	
	.caseSbmit .eidt-line .ll{ width: 30%;}
	.caseSbmit .eidt-line .rr{ width: 70%;}
	/* .styleLis{ width: 100%; display: flex; flex-wrap: wrap;justify-content: flex-end;}
	.styleLis .item{padding:0rpx 0 10rpx 30rpx;display: flex;justify-content: flex-end; align-items: center;}
	.styleLis .item .icon{  width: 36rpx;height: 36rpx; margin-right: 10rpx;font-size: 26rpx;}
	.styleLis .item .icon image{width: 100%;height: 100%; display: block;} */
	.r-selt .selt{ width: 50%; justify-content: flex-start;}
	

</style> 
