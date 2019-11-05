<template>
	<view>
		<view class="pdlr4">
			<view class="font14 receiptMsg boxShaow">
				<view class="item flexRowBetween">
					<view class="">姓名</view>
					<view>{{mainData.name}}</view>
				</view>
				<view class="item flexRowBetween">
					<view class="">电话</view>
					<view>{{mainData.phone}}</view>
				</view>
			</view>
		</view>
		<view class="pdlr4">工程信息</view>
		<view class="ind_seach" style="border-bottom: 2rpx solid #f5f5f5;">
			<view class="child">
				<view class="editNum" style="width: 200rpx;margin-left:0 ;">
					<input type="number" :value="mainData.products&&mainData.products[0]?mainData.products[0].snap_product.title:''"
					 disabled="true">
				</view>
				<view class="editNum">
					<input type="number" value="" placeholder="请输入数量" v-model="count">
				</view>
				<view class="optBtn flexRowBetween" v-if="orderItem.length==0&&mainData.type==1">

					<view class="btn" @click="addProject">添加</view>
				</view>
			</view>
			<view class="child" v-for="(item,index) in orderItem">
				<view class="sqr_name">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker @change="PickerChangeTwo" :data-index="index" :range="skillData" range-key="title">
									<view class="uni-input">{{orderItem[index].title!=''?orderItem[index].title:'请选择'}}</view>
								</picker>
							</view>
						</view>
					</view>
					<image class="arrow" src="../../static/images/home-icon1.png"></image>
				</view>
				<view class="editNum">
					<input type="number" v-model="orderItem[index].count" placeholder="请输入数量">
				</view>
				<view class="optBtn flexRowBetween">
					<view class="btn btn1">删除</view>
					<view class="btn" @click="addProject" v-if="orderItem.length==index+1">添加</view>
				</view>
			</view>
		</view>
		<view class="pdlr4" v-if="mainData.type==1">辅料</view>
		<view class="ind_seach" style="border-bottom: 2rpx solid #f5f5f5;" v-if="mainData.type==1">
			<view class="child" v-for="(item,index) in orderItemTwo">
				<view class="sqr_name" style="overflow: hidden;">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker @change="PickerChangeThree" :data-index="index" :range="materialData" range-key="title">
									<view class="uni-input">
									{{orderItemTwo[index].title!=''?orderItemTwo[index].title:'请选择'}}
									</view>
								</picker>
							</view>
						</view>
					</view>
					<image class="arrow" src="../../static/images/home-icon1.png"></image>
				</view>
				<view class="editNum">
					<input type="number" value="" placeholder="请输入数量" v-model="orderItemTwo[index].count">
				</view>
				<view class="optBtn flexRowBetween">
					<view class="btn btn1">删除</view>
					<view class="btn" @click="addMaterialData" v-if="orderItemTwo.length==index+1">添加</view>
				</view>
			</view>
		</view>

		<view class="submitbtn" style="margin-top: 200rpx;">
			<button type="button" @click="submit">确认</button>
		</view>


	</view>

</template>

<script>
	export default {
		data() {
			return {
				Router: this.$Router,

				count: '',
				mainData: {},
				orderItem: [],
				skillData: [],
				materialData: [],
				orderItemTwo: [{
					product_id: '',
					count: '',
					title: ''
				}]
			}
		},

		onLoad(options) {
			const self = this;
			self.id = options.id;

			self.$Utils.loadAll(['getMainData', 'getSkillData', 'getMaterialData'], self)
		},

		methods: {

			addProject() {
				const self = this;
				self.orderItem.push({
					product_id: '',
					count: '',
					title: ''
				})
			},

			addMaterialData() {
				const self = this;
				self.orderItemTwo.push({
					product_id: '',
					count: '',
					title: ''
				})
			},

			submit() {
				const self = this;
				console.log('self.orderItem', self.orderItem)
				console.log('self.orderItemTwo', self.orderItemTwo)

				
				if (self.count == '') {
					self.$Utils.showToast('请输入工程数量（面积）', 'none');
				} else {
					self.postOrderItem = self.orderItem.concat(self.orderItemTwo)
					self.orderUpdate()
				}
			},

			orderUpdate() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					order_no: self.mainData.order_no,
					user_type: 0
				};
				postData.data = {
					comfirm: 1
				};
				postData.tokenFuncName = 'getThreeToken';
				postData.saveAfter = [{
						tableName: 'OrderItem',
						FuncName: 'update',
						data: {
							count: self.count
						},
						searchItem: {
							id: self.mainData.products[0].id,
							user_type: 0
						}
					},
					{
						tableName: 'Process',
						FuncName: 'add',
						data: {
							type: 1,
							order_no: self.mainData.order_no,
							title:uni.getStorageSync('threeInfo').identity==1?'工人'+uni.getStorageSync('threeInfo').info.name+'上传':'设计师'+uni.getStorageSync('threeInfo').info.name+'上传'
						}
					}
				];	
				if(self.mainData.type==1){
					postData.saveFunction = [
						{
							FuncName: 'addItem',
							data: {
								order_no: self.mainData.order_no,
								item: self.postOrderItem
							}		
						}
					];
				}	
				console.log('postData', postData)
				
				const callback = (res) => {
					if (res.solely_code == 100000) {
						self.$Utils.showToast(res.msg, 'none');
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 800);
					} else {
						self.$Utils.showToast(res.msg, 'none');
					}
				};
				self.$apis.orderUpdate(postData, callback);
			},

			PickerChangeTwo(e) {
				const self = this;
				var productData = self.skillData[e.detail.value];
				console.log('productData', productData);
				self.orderItem[e.target.dataset.index].product_id = productData.id;
				self.orderItem[e.target.dataset.index].title = productData.title;
			},

			PickerChangeThree(e) {
				const self = this;
				var productData = self.materialData[e.detail.value];
				console.log('productData', productData);
				self.orderItemTwo[e.target.dataset.index].product_id = productData.id;
				self.orderItemTwo[e.target.dataset.index].title = productData.title;
			},

			getSkillData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					type: 1,
					user_no: uni.getStorageSync('threeInfo').user_no
				};
				postData.tokenFuncName = 'getThreeToken';
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.skillData.push.apply(self.skillData, res.info.data)

					}
					self.$Utils.finishFunc('getSkillData');
				};
				self.$apis.productGet(postData, callback);
			},

			getMaterialData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					type: 4,
					category_id: ['not in', [46]]
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.materialData.push.apply(self.materialData, res.info.data)
					}
					self.$Utils.finishFunc('getMaterialData');
				};
				self.$apis.productGet(postData, callback);
			},

			getMainData() {
				const self = this;
				const postData = {};

				postData.searchItem = {
					id: self.id,
					user_type: 0
				};
				postData.tokenFuncName = 'getThreeToken';
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0];
					} else {
						self.$Utils.showToast(res.msg, 'none');
					};
					console.log(self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.orderGet(postData, callback);
			},
		}
	}
</script>

<style>
	@import "../../assets/style/index.css";

	page {
		padding-bottom: 80rpx;
	}

	.receiptMsg {
		border-radius: 10rpx;
		margin: 40rpx auto;
	}

	.receiptMsg .item {
		padding: 30rpx;
		border-bottom: 2rpx solid #f5f5f5;
	}

	.ind_seach {
		margin-bottom: 30rpx;
	}

	.ind_seach .child {
		display: flex;
		justify-content: flex-start;
		padding-bottom: 30rpx;
	}

	.ind_seach .child:last-child {
		padding-bottom: 0;
	}

	.ind_seach .sqr_name {}

	.ind_seach .sqr_name .uni-input {
		color: #666;
	}

	.ind_seach .editNum {
		margin-left: 20rpx;
		width: 180rpx;
	}

	.ind_seach .editNum input {
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 8rpx;
		border: 2rpx solid #cecece;
		padding: 0 10rpx;
		box-sizing: border-box;
		text-align: center;
		display: block;
	}

	.optBtn {
		width: 280rpx;
		display: flex;
		justify-content: flex-end;
	}

	.optBtn .btn {
		width: 100rpx;
		height: 60rpx;
		background: #FFCB1E;
		text-align: center;
		line-height: 60rpx;
		border-radius: 8rpx;
		font-size: 24rpx;
		margin-left: 10rpx;
	}

	.optBtn .btn.btn1 {
		background: #ffe89c;
	}
</style>
