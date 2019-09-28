<template>
	<view>
		
		<view class="pdlr4" style="padding-top: 40rpx;">
			<view class="font15 title">{{type=='worker'?'工种类别分类':'选择风格'}}</view>
			<view class="rr styleLis">
				<view class="item" v-for="(item,index) in mainData" :key="index">
					<view class="icon" @click="choose(index)">
						<image :src="title==item.title?'../../static/images/about-address-icon1.png':'../../static/images/about-address-icon4.png'" alt=""/>
					</view>
					<view class="tit">{{item.title}}</view>
				</view>
			</view>
		</view>
		<view class="f5H5"></view>
		<view class="flexRowBetween money">
			<view>价格</view>
			<view class="">
				<input type="number" value="" v-model="price"  style="text-align: right;" placeholder="请输入价格"/>
			</view>
		</view>
		<view class="f5H5"></view>
		
		
		<view class="submitbtn" style="margin-top: 200rpx;">
			<button type="submit" @click="Utils.stopMultiClick(submit)">确认</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				Utils:this.$Utils,
				mainData:[],
				title:'',
				price:'',
				index:'',
				passage1:'',
				passage2:'',
				
			}
		},
		
		onLoad(options) {
			const self = this;
			if(uni.getStorageSync('threeInfo').identity==1){
				self.type='worker'		
			}else if(uni.getStorageSync('threeInfo').identity==2){
				self.type='designer'				
			}
			self.$Utils.loadAll(['getMainData'], self);
			if(options.id){
				self.id = options.id;
				
			}
		},
		
		methods: {
			
			submit(){
				const self = this;
				if(self.id){
					self.productUpdate()
				}else{
					self.productAdd()
				}
			},
			
			productUpdate() {
				const self = this;
				
				uni.setStorageSync('canClick', false);
				
				if(self.title==''){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请选择类别', 'none');
					return
				};
				if(self.price==''){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请输入价格', 'none');
					return
				};
				const postData = {};
				postData.tokenFuncName = 'getThreeToken';
				postData.data = {
					title:self.title,
					price:self.price,
					category_id:self.mainData[self.index].id,
					passage1:self.passage1,
					passage2:self.passage2
				};				
				postData.searchItem = {
					id:self.id
				};
				const callback = (data) => {				
					if (data.solely_code == 100000) {					
						self.$Utils.showToast('编辑成功', 'none');
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
				self.$apis.productUpdate(postData, callback);
			},
			
			getProductData() {
				const self = this;	
				const postData = {};
				postData.tokenFuncName = 'getThreeToken';				
				postData.searchItem = {
					thirdapp_id: 2,
					
					id:self.id
				};		
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.productData = res.info.data[0];
						self.title = self.productData.title;
						self.price = self.productData.price;
						self.passage1 = self.productData.passage1;
						self.passage2 = self.productData.passage2;
						for (var i = 0; i < self.mainData.length; i++) {
							if(self.mainData[i].id = self.productData.category_id){
								self.index = i
							}					
						}
					} 
					console.log('self.productData', self.productData)
					
				};
				self.$apis.productGet(postData, callback);
			},
			
			productAdd() {
				const self = this;
				
				uni.setStorageSync('canClick', false);
				if(uni.getStorageSync('threeInfo').info.mainImg.length==0){
					uni.setStorageSync('canClick', true);
					uni.showModal({
					    title: '提示',
					    content: '需完善个人信息后才能添加',
					    success: function (res) {
					        if (res.confirm) {
					            
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
					return
				};
				if(self.title==''){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请选择类别', 'none');
					return
				};
				if(self.price==''){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请输入价格', 'none');
					return
				};
				const postData = {};
				postData.tokenFuncName = 'getThreeToken';
				postData.data = {
					title:self.title,
					price:self.price,
					category_id:self.mainData[self.index].id,
					passage1:self.passage1,
					passage2:self.passage2
				};				
				if(self.type=='worker'){
					postData.data.type=1
				}else{
					postData.data.type=2
				};
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
				self.$apis.productAdd(postData, callback);
			},
			
			
			choose(index){
				const self = this;
				self.index = index;
				self.title = self.mainData[self.index].title
			},
			
			getMainData() {
				const self = this;
				console.log('852369')
				const postData = {
					searchItem:{}
				};
				if(self.type=='worker'){
					postData.searchItem.parentid = uni.getStorageSync('threeInfo').info.work
				}else if(self.type=='designer'){
					postData.searchItem.parentid = uni.getStorageSync('threeInfo').info.type
				};
				postData.getAfter = {
					parent:{
						tableName:'Label',
						middleKey:'parentid',
						key:'id',
						searchItem:{
							status:1
						},
						condition:'='
					},
					highParent:{
						tableName:'Label',
						middleKey:['parent',0,'parentid'],
						key:'id',
						searchItem:{
							status:1
						},
						condition:'='
					}
				};
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.mainData = res.info.data;
						self.passage2 = self.mainData[0].parent[0].title;
						if(self.mainData[0].highParent[0]){
							self.passage1 = self.mainData[0].highParent[0].title
						};
						if(self.id){
							self.getProductData()
						}
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getMainData');

				};
				self.$apis.labelGet(postData, callback);
			},

		},
	};
</script>
<style>
	.title{padding-bottom: 30rpx;}
	.tex{padding-bottom: 20rpx;}
	.money{padding: 30rpx 4%;}
	.styleLis{ width: 100%; display: flex; flex-wrap: wrap;justify-content: flex-start;padding-bottom: 20rpx;}
	.styleLis .item{margin:0rpx 30rpx 30rpx 0rpx;display: flex;justify-content: flex-start; align-items: center; box-sizing: border-box;}
	.styleLis .item:nth-child(4n){margin-right: 0;}
	.styleLis .item .icon{  width: 36rpx;height: 36rpx; margin-right: 10rpx;font-size: 26rpx;}
	.styleLis .item .icon image{width: 100%;height: 100%; display: block;}
	input{ width: 300rpx; height: 60rpx; line-height: 60rpx; text-align: right; display: block;}
</style>

 
