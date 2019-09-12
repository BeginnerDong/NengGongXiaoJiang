<template>
	<view>
		<view class="contractBox pdlr4">
			<view class="topTitle center">施工合同</view>
			<view class="ApartyB">
				<view class="list flex">
					<view class="name">甲方：</view>
					<view class="text">注册个人</view>
				</view>
				<view class="list flex">
					<view class="name">乙方：</view>
					<view class="text">陕西棒呔劳务有限公司<text class="red">（木工)、(瓦工)</text></view>
				</view>
			</view>
			<view class="mainCont">
				<view class="titOne">第一条  工程概况：</view>
				<view>
					1.1、工程名称： 自动显示工程类型，如“装修工-木工”<br/>
					1.2、雇佣方式：自动显示雇佣方式，（包工）、（购买辅料）各选一个。
				</view>
				<view>本工程合同总工期按甲方要求，实际开工日期由甲方提前网约，乙方确认为准。</view>
				
				<view class="titOne">如遇下列情况，工期相应顺延：</view>
				<view>
					1.4.1、因气候或其他意外原因，如地面基层未达到施工标准；<br/>
					1.4.2、因甲方原因未能及时交付施工场地或交叉施工影响工程进度；<br/>
					1.4.3、施工中因停电连续影响24小时以上，或间歇停电两天以上；<br/>
					1.4.4、因自然原因等不可抗拒的因素影响施工进度的。
				</view>
				
				<view class="titOne">第二条  合同金额，后附施工做法清单<text class="red ftn">(单价为工人注册填写，面积为测量后填写）</text></view>
				<view class="formCont">
					<view class="table">
						<view class="tr trfat">
							<view class="td">序号</view>
							<view class="td">施工项目</view>
							<view class="td">单位</view>
							<view class="td">数量</view>
							<view class="td">单价</view>
							<view class="td">小计(元)</view>
						</view>
						<view class="tr">
							<view class="td">1</view>
							<view class="td">顶面石膏板吊顶</view>
							<view class="td">㎡</view>
							<view class="td">1000</view>
							<view class="td">40</view>
							<view class="td">40000</view>
						</view>
						<view class="tr">
							<view class="td">2</view>
							<view class="td">墙面石膏板隔墙</view>
							<view class="td">㎡</view>
							<view class="td">10</view>
							<view class="td">30</view>
							<view class="td">300</view>
						</view>
						<view class="tr">
							<view class="td">3</view>
							<view class="td">灯带</view>
							<view class="td">M</view>
							<view class="td">20</view>
							<view class="td">40</view>
							<view class="td">800</view>
						</view>
						<view class="tr">
							<view class="td">4</view>
							<view class="td">协商赏金</view>
							<view class="td">项</view>
							<view class="td">1</view>
							<view class="td">500</view>
							<view class="td">500</view>
						</view>
						<view class="tr">
							<view class="td">5</view>
							<view class="td">平正铺砖</view>
							<view class="td">㎡</view>
							<view class="td">200</view>
							<view class="td">25</view>
							<view class="td">5000</view>
						</view>
						<view class="tr">
							<view class="td">6</view>
							<view class="td">地面砖</view>
							<view class="td">㎡</view>
							<view class="td">200</view>
							<view class="td">50</view>
							<view class="td">10000</view>
						</view>
					</view>
				</view>
				<view class="center" style="width: 80%;margin: 0 auto;">注：资金托管至第三方，施工结束后确认付款，至工人账户</view>
				<view class="titOne">第三条  质量保证：</view>
				<view>
					3.1、施工要求：  按合同项目要求及做法。<br/>
					3.2、工程质量：依照《中华人民共和国经济合同法》及国家建设部、省市建委对建筑装饰工程的有关规定。<br/>
					3.3、保质期限：一年内如因施工原因所造成的质量问题，乙方负责免费返修，终身维修。<br/>
				</view>
				<view class="titOne">第四条  双方责任：</view>
				<view>4.1、甲方责任：</view>
				<view>
					4.1.1、合同签订时向乙方提供施工任务所需的水电，达到乙方要求；<br/>
					4.1.4、按时支付工程款项。
				</view>
				<view>4.2、乙方责任：</view>
				<view>
					4.2.1、按图纸及国家有关规程规范进行施工，确保施工达到相关质量标准；<br/>
					4.2.2、乙方在施工过程中。必须切实注意施工安全，按规范操作施工，如因乙方原因出现安全事故问题，由乙方承担责任。
				</view>
				<view class="titOne">第五条  付款方式：</view>
				<view>
					5.1、款项托管：全款扣除至能工小匠平台账户监管<br/>
					5.2、首期付款：开工确认付款<text class="red">30</text>%至工人账户<br/>
					5.3、验收后付尾款：验收合格后付付款至工人账户。
				</view>
				<view class="titOne">第六条  其他事项：</view>
				<view>
					6.1、本合同涉及所有款项必须汇入能工小匠平台，否则所产生的纠纷乙方概不负责。<br/>
					6.2、本合同自签订之日起即具有法律效力，双方必须完全履行，不得任意变更或解除，因履行本合同发生的争议，由双方友好协商解决，协商不成可向乙方所在地人民法院提起诉讼。<br/>
					6.3、本合同一式<span class="underline">贰</span>联，甲乙方各执<span class="underline">壹</span>联（电子合同）。<br/>
					6.4、其他未尽事宜，双方另行协商解决。<br/>
				</view>
				<view class="flex" style="align-items: normal;">
					<view class="ftw font14" style="width: 15%;">备注：</view>
					<view class="red" style="width: 85%;">内容内容内容内容内容让你让内容让你人人内容你让内容内容内容内容内容内容让你让内容内容你让内容人</view>
				</view>
			</view>
			<view class="ABfangName flexRowBetween">
				<view class="sf jia">
					<view class="one center">甲方</view>
					<view class="center">已电子确认时间为准</view>
				</view>
				<view class="sf yi">
					<view class="one center">乙方</view>
					<view class="comy">单位名称（章）：陕西棒呔劳务有限公司</view>
					<view class="adrs">单位地址：陕西省西安市莲湖区XXXX</view>
				</view>
				
			</view>
			
			<view class="submitbtn" style="margin-top: 100rpx;">
				<button type="button" @click="webSelf.$Router.navigateTo({route:{path:'/pages/myToolingOrderDetail/myToolingOrderDetail'}})">确认合同</button>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				webSelf: this,
				score: '',
				wx_info: {}
			}
		},

		methods: {
			getMainData() {
				const self = this;
				self.$apis.userGet(postData, callback);
			}
		}
	}
</script>

<style>
	page{padding-bottom: 80rpx;}
	.topTitle{font-size: 36rpx;padding: 40rpx 0 20rpx 0;}
	.ApartyB .list{padding-top: 30rpx;line-height: 44rpx; }
	.ApartyB .list .name{ width: 15%;}
	.ApartyB .list .text{ width: 85%;border-bottom: 2rpx solid #e7e7e7; height: 44rpx; line-height: 44rpx;}
	.mainCont{padding-top: 10rpx;}
	.mainCont .titOne{font-size: 28rpx; font-weight: bold;padding: 30rpx 0 10rpx;}
	.mainCont view{font-size: 26rpx; line-height: 46rpx; padding-bottom: 10rpx;}
	.mainCont .underline{padding: 0 20rpx 10rpx 20rpx;border-bottom: 2rpx solid #333;}
	
	.formCont .table view{font-size: 20rpx; line-height: 34rpx;}
	.table{border: 2rpx solid #e7e7e7;border-right: 0;border-bottom: 0;width: 98%;text-align: center; align-items: center; margin-top: 30rpx;}
	.table view.trfat{height: 100rpx;}
	.table view.trfat .td{color: #333;font-weight: bold;}
	.table .tr{width: 100%; display: flex;justify-content: space-between;align-items: center;height: 90rpx;padding-bottom: 0;}
	.table .td {width: 16.66%;padding: 16rpx 6rpx;border-bottom: 2rpx solid #eee;border-right:2rpx solid #eee;text-align: center;box-sizing: border-box;color: #FF3B3B;height: 100%;box-sizing: border-box; display: flex; align-items: center;justify-content: center;box-sizing: border-box;}
	.table .tr .td:nth-of-type(1){ width: 10%;}
	.table .tr .td:nth-of-type(2){ width: 32%;}
	.table .tr .td:nth-of-type(3){ width: 10%;}
	.table .tr .td:nth-of-type(4){ width: 14%;}
	.table .tr .td:nth-of-type(5){ width: 14%;}
	.table .tr .td:nth-of-type(6){ width: 14%;}
	.ABfangName{width: 100%;box-sizing: border-box;border:2rpx solid #4a4a4a;height: 300rpx;margin-top: 20rpx;font-size: 24rpx;}
	.ABfangName .sf{width: 50%;height: 100%;box-sizing: border-box;padding: 20rpx;}
	.ABfangName .jia{border-right: 2rpx solid #4A4A4A;}
	.ABfangName .one{text-align: center;padding-bottom: 20rpx;}
	.ABfangName .sf .comy{padding-bottom: 10rpx;}
</style>
