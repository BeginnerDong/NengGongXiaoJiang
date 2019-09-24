<template>
	<view>
		<view class="pdlr4">
			<view class="font14 receiptMsg boxShaow">
				<view class="item flexRowBetween">
					<view class="">姓名</view>
					<view>张丹</view>
				</view>
				<view class="item flexRowBetween">
					<view class="">电话</view>
					<view>1893362203</view>
				</view>
			</view>
		</view>
		<view class="pdlr4">工程信息</view>
		<view class="ind_seach" style="border-bottom: 2rpx solid #f5f5f5;">
			<view class="child">
				<view class="sqr_name">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker @change="bindPickerChange" :value="index" :range="array">
									<view class="uni-input">{{array[index]}}</view>
								</picker>
							</view>
						</view>
					</view>
					<image class="arrow" src="../../static/images/home-icon1.png"></image>
				</view>
				<view class="editNum">
					<input type="number" value="" placeholder="请输入数量">
				</view>
			</view>
			<view class="child">
				<view class="sqr_name">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker @change="PickerChangeTwo" :value="indexTwo" :range="arrayTwo">
									<view class="uni-input">{{arrayTwo[indexTwo]}}</view>
								</picker>
							</view>
						</view>
					</view>
					<image class="arrow" src="../../static/images/home-icon1.png"></image>
				</view>
				<view class="editNum">
					<input type="number" value="24" placeholder="请输入数量">
				</view>
				<view class="optBtn flexRowBetween">
					<view class="btn btn1">删除</view>
					<view class="btn">添加</view>
				</view>
			</view>
		</view>
		<view class="pdlr4">辅料</view>
		<view class="ind_seach" style="border-bottom: 2rpx solid #f5f5f5;">
			<view class="child">
				<view class="sqr_name">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker @change="PickerChangeThree" :value="indexThree" :range="arrayThree">
									<view class="uni-input">{{arrayThree[indexThree]}}</view>
								</picker>
							</view>
						</view>
					</view>
					<image class="arrow" src="../../static/images/home-icon1.png"></image>
				</view>
				<view class="editNum">
					<input type="number" value="" placeholder="请输入数量">
				</view>
				<view class="optBtn flexRowBetween">
					<view class="btn btn1">删除</view>
					<view class="btn">添加</view>
				</view>
			</view>
			<view class="child">
				<view class="sqr_name">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker @change="PickerChangeFour" :value="indexFour" :range="arrayFour">
									<view class="uni-input">{{arrayFour[indexFour]}}</view>
								</picker>
							</view>
						</view>
					</view>
					<image class="arrow" src="../../static/images/home-icon1.png"></image>
				</view>
				<view class="editNum">
					<input type="number" value="24" placeholder="请输入数量">
				</view>
				<view class="optBtn flexRowBetween">
					<view class="btn btn1">删除</view>
					<view class="btn">添加</view>
				</view>
			</view>
		</view>
		
		<view class="submitbtn" style="margin-top: 200rpx;">
			<button type="button" @click=" Router.navigateTo({route:{path:'/pages/myToolingOrder_contract/myToolingOrder_contract'}})">确认</button>
		</view>
		
		
	</view>

</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				showView: false,
				score: '',
				wx_info: {},
				index: 0,
				array:['请选择工程','建筑工','装修工','维修工','园林工','市政工','安装工','其他'],
				indexTwo: 0,
				arrayTwo:['水泥','沙子','钢筋','其他'],
				indexThree: 0,
				arrayThree:['请选择辅料','柜子','椅子','建筑材料','木门'],
				indexFour: 0,
				arrayFour:['衣柜','鞋柜','书柜','床头柜','其他']
			}
		},

		methods: {
			bindPickerChange(e) {
				// 搜索选择分类
				const self = this;
				console.log('picker发送选择改变，携带值为', e.target.value)
				self.index = e.target.value
			},
			PickerChangeTwo(e) {
				// 搜索选择分类
				const self = this;
				console.log('picker发送选择改变，携带值为', e.target.value)
				self.indexTwo = e.target.value
			},
			PickerChangeThree(e){
				const self = this;
				console.log('picker发送选择改变，携带值为', e.target.value)
				self.indexThree = e.target.value
			},
			PickerChangeFour(e){
				const self = this;
				console.log('picker发送选择改变，携带值为', e.target.value)
				self.indexFour = e.target.value
			},
			getMainData() {
				const self = this;
				self.$apis.userGet(postData, callback);
			}
		}
	}
</script>

<style>
	@import "../../assets/style/index.css";
	page{padding-bottom: 80rpx;}
	.receiptMsg{border-radius: 10rpx;margin: 40rpx auto;}
	.receiptMsg .item{padding: 30rpx;border-bottom: 2rpx solid #f5f5f5;}
	.ind_seach{margin-bottom: 30rpx;}
	.ind_seach .child{ display: flex;justify-content: flex-start;padding-bottom: 30rpx;}
	.ind_seach .child:last-child{padding-bottom: 0;}
	.ind_seach .sqr_name{}
	.ind_seach .sqr_name .uni-input{font-size: 26rpx; color: #666;}
	.ind_seach .editNum{margin-left: 20rpx;width: 180rpx;}
	.ind_seach .editNum input{ width: 100%; height: 60rpx; line-height: 60rpx;border-radius:8rpx;border: 2rpx solid #cecece; padding: 0 10rpx;box-sizing: border-box; font-size: 13rpx;text-align: center; display: block;}
	.optBtn{ width: 280rpx; display: flex;justify-content: flex-end;}
	.optBtn .btn{ width: 100rpx; height: 60rpx;background: #FFCB1E;text-align: center;line-height: 60rpx;border-radius: 8rpx; font-size: 24rpx;margin-left:10rpx;}
	.optBtn .btn.btn1{background: #ffe89c;}
	
</style>
