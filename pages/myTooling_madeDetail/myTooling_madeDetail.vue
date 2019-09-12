<template>
	<view>
		<view class="prolisbox">
			<view class="prolis prolis3" style="margin-top: 0;">
				<view class="datt">
					<view class="left">
						<view class="color2" style="margin-bottom: 10rpx;">订单编号：123356885555</view>
						<view class="color3">交易时间：2018-08-30</view>
					</view>
					<view class="state">等待确认</view>
				</view>
				<view class="twoCt" style="justify-content:flex-start">
					<view class="leftbox">
						<image src="../../static/images/shopping-img1.png"></image>
					</view>
					<view class="cont" style="width: 66%;">
						<view class="title avoidOverflow">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</view>
						<view class="tex font12 color2 avoidOverflow">类型：橱柜</view>
						<view class="tex font12 color2 avoidOverflow">风格：简约风</view>
					</view>
				</view>
			</view>
		</view>
		<view class="f5H10"></view>
		
		
		<view class="infor-title flexRowBetween" style="padding-bottom: 30rpx;">
			<view class="xian"></view>
			<view class="tt">所需材料</view>
		</view>
		<view class="mglr4 myStuffList boxShaow">
			<view class="item flexRowBetween">
				<view class="title">木板</view>
				<view class="infor flexRowBetween">
					<view class="lis left">3*3cm</view>
					<view class="lis center">×100</view>
					<view class="lis right red">5元/个</view>
				</view>
			</view>
			<view class="item flexRowBetween">
				<view class="title">钉子</view>
				<view class="infor flexRowBetween">
					<view class="lis center">×10</view>
					<view class="lis right red">3元/个</view>
				</view>
			</view>
			<view class="item flexRowBetween">
				<view class="title">人工费</view>
				<view class="infor flexRowBetween">
					<view class="lis right red">120元</view>
				</view>
			</view>
			<view class="item flexRowBetween">
				<view class="title">总计</view>
				<view class="infor flexRowBetween">
					<view class="lis right red">650元</view>
				</view>
			</view>
		</view>
		
		<view class="submitbtn" style="margin-top: 100rpx;">
			<button type="submit" style="margin-bottom: 20rpx;" @click="xieyiAlert">确认</button>
		</view>
		<view class="xieyiAlert" v-if="is_show">
			<view class="infor">
				<view class="submitbtn" style="background: #fff;position: absolute; bottom:0rpx;left: 0; width: 100%;box-sizing: border-box;">
					<button type="button" @click="xieyiAlert" style="margin-bottom: 40rpx;">确认</button>
				</view>
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
				webSelf: this,
				showView: false,
				score: '',
				wx_info: {},
				is_show:false
			}
		},

		methods: {
			xieyiAlert(){
				const self = this;
				self.is_show=!self.is_show;
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
	page{padding-bottom: 80rpx;}
	.tooling_indNav{padding: 30rpx 4%;background: #f5f5f5;}
	.tooling_indNav .list{background: #fff; border-radius: 10rpx;overflow: hidden; display: flex;justify-content: center; align-items: center;}
	.tooling_indNav .list .item{width: 33.3%;box-sizing: border-box;text-align: center;padding: 0 10rpx;color: #666;line-height: 70rpx;border-right: 2rpx solid #e7e7e7;}
	.tooling_indNav .list .item.on{background: #FFCB1E;}
	.tooling_indNav .list .item:last-child{border-right: 0;}
	.prolis3 .cont{padding: 20rpx 0;box-sizing: border-box;}
	.prolis3 .tex{margin-top: 20rpx;}
	
	.myStuffList{border-radius: 10rpx;overflow: hidden;}
	.myStuffList .item{padding: 30rpx 4%;border-bottom: 2rpx solid #E7E7E7;}
	.myStuffList .item:last-child{border-bottom: none;}
	.myStuffList .item .title{width: 30%;}
	.myStuffList .infor{ width: 70%; font-size: 26rpx; justify-content: flex-end;}
	.myStuffList .infor .lis{width: 33.3%;box-sizing: border-box;padding: 0 20rpx;text-align: right;}
	
</style>
