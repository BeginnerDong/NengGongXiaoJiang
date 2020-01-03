<template>
	<view v-if="showAll">
		<view class="contractBox pdlr4" v-if="mainData.type==1">
			<view class="topTitle center" style="font-weight: 700;">委托施工合同书</view>
			<view style="text-align: right;">合同编号：西安-{{mainData.create_time}}</view>
			<view class="ApartyB">
				<view class="list flex">
					<view class="name">甲方：</view>
					<view class="text">{{mainData.name}}</view>
				</view>
				<view class="list flex">
					<view class="name">乙方：</view>
					<view class="text">陕西棒呔劳务有限公司<text class="red">（{{mainData.userInfo&&mainData.userInfo[0]?mainData.userInfo[0].name:''}})</text></view>
				</view>
			</view>
			<view class="mainCont">
				<view class="titOne">第一条  工程概况：</view>
				<view>
					1.1、工程名称： {{mainData.products&&mainData.products[0]&&mainData.products[0].snap_product?mainData.products[0].snap_product.passage1:''}}-{{mainData.products&&mainData.products[0]&&mainData.products[0].snap_product?mainData.products[0].snap_product.passage2:''}}<br/>
					1.2、工程范围：<span>{{mainData.passage2}}</span>、<span v-if="mainData.products.length>1">项目：{{mainData.products&&mainData.products[0]&&mainData.products[0].snap_product?mainData.products[0].snap_product.passage1:''}}</span>、<span v-if="mainData.products.length>1">{{mainData.products&&mainData.products[0]&&mainData.products[0].snap_product?mainData.products[0].snap_product.passage2:''}}</span><br/>
					1.3、雇佣方式：<span>（包工）</span>、<span v-if="mainData.products.length>1">（平台自购辅料）</span>
				</view>
				<view>本工程合同总工期按甲方要求，实际开工日期由甲方提前网约，乙方确认为准。</view>
				<view>平台服务内容：平台为雇主和雇工提供一对一服务。</view>
				
				<view class="titOne">如遇下列情况，工期相应顺延：</view>
				<view>
					1.4.1、因气候或其他意外原因，如地面基层未达到施工标准；<br/>
					1.4.2、因甲方原因未能及时交付施工场地或交叉施工影响工程进度；<br/>
					1.4.3、施工中因停电连续影响24小时以上，或间歇停电两天以上；<br/>
					1.4.4、因自然原因等不可抗拒的因素影响施工进度的。
				</view>
				
				<view class="titOne">第二条  合同金额<text class="red ftn">(单价为工人注册填写，面积为测量后填写）</text></view>
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
						<view class="tr" v-for="(item,index) in mainData.products">
							<view class="td">{{index+1}}</view>
							<view class="td">{{item.title}}</view>
							<view class="td">{{item.snap_product.label[item.snap_product.category_id].description}}</view>
							<view class="td">{{item.count}}</view>
							<view class="td">{{item.price}}</view>
							<view class="td">{{item.price*item.count}}</view>
						</view>
					<view class="tr">
						<view class="td">合计</view>
						
						<view class="td" style="width: 90%;">金额:{{mainData.price}}（税点另计）</view>
					</view>
					</view>
				</view>
				<view class="center" style="width: 80%;margin: 0 auto;">注：资金托管至第三方，施工结束后确认付款，至工人账户，材料为全款支付。</view>
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
					4.1.4、甲方（雇佣方）按时支付工程款项。
				</view>
				<view>4.2、乙方责任：</view>
				<view>
					4.2.1、按图纸及国家有关规程规范进行施工，确保施工达到相关质量标准；<br/>
					4.2.2、乙方（被雇佣方）在施工过程中，需确保不破坏其它成品，按规范操作施工，如因乙方原因出现成品损坏，由乙方施工人员承担责任。
				</view>
				<view class="titOne">第五条  付款方式：</view>
				<view>
					5.1、款项托管：全款扣除至能工小匠平台账户监管<br/>
					5.2、首期付款：开工确认付款<text class="red">{{ratio}}</text>%至工人账户（不可以提现）<br/>
					5.3、验收后付尾款：验收合格后付付款至工人账户（可申请提现）。
				</view>
				<view class="titOne">第六条  其他事项：</view>
				<view>
					6.1、本合同涉及所有款项必须汇入能工小匠平台，否则所产生的纠纷乙方概不负责。<br/>
					6.2、本合同自签订之日起即具有法律效力，双方必须完全履行，不得任意变更或解除，因履行本合同发生的争议，由双方友好协商解决，协商不成可向乙方所在地人民法院提起诉讼。<br/>
					6.3、本合同一式<span class="underline">贰</span>联，甲乙方各执<span class="underline">壹</span>联（电子合同）。<br/>
					6.4、其他未尽事宜，双方另行协商解决。<br/>
				</view>
				<!-- <view class="flex" style="align-items: normal;">
					<view class="ftw font14" style="width: 15%;">备注：</view>
					<view class="red" style="width: 85%;">内容内容内容内容内容让你让内容让你人人内容你让内容内容内容内容内容内容让你让内容内容你让内容人</view>
				</view> -->
			</view>
			<view class="ABfangName flexRowBetween">
				<view class="sf jia">
					<view class="one center">甲方</view>
					<view class="center">已电子确认时间为准</view>
				</view>
				<view class="sf yi">
					<view class="one center">乙方</view>
					<view class="comy">单位名称（章）：陕西棒呔劳务有限公司</view>
					<view class="adrs">{{mainData.userInfo&&mainData.userInfo[0]?mainData.userInfo[0].name:''}}</view>
				</view>
				
			</view>
			
			<view class="submitbtn" style="margin-top: 100rpx;">
				<button type="button" v-if="type==0"
				@click="pay()">确认合同</button>
				<button type="button" v-if="type==1"
				@click="orderUpdate()">确认合同</button>
			</view>
		</view>
		<view class="contractBox pdlr4" v-if="mainData.type==2">
			<view class="topTitle center" style="font-weight: 700;">委托设计服务项目介绍合同书</view>
			<view class="ApartyB">
				<view class="list flex">
					<view class="name">甲方：</view>
					<view class="text">{{mainData.name}}</view>
				</view>
				<view class="list flex">
					<view class="name">乙方：</view>
					<view class="text">陕西棒呔劳务有限公司<text class="red">（{{mainData.userInfo&&mainData.userInfo[0]?mainData.userInfo[0].name:''}})</text></view>
				</view>
			</view>
			<view class="mainCont">
				<view class="titOne">第一条  设计概况：</view>
				<view>
					1.1、设计名称： {{mainData.products&&mainData.products[0]&&mainData.products[0].snap_product?mainData.products[0].snap_product.passage1:''}}-{{mainData.products&&mainData.products[0]&&mainData.products[0].snap_product?mainData.products[0].snap_product.passage2:''}}<br/>
					1.2、设计地址：<span>{{mainData.passage2}}</span>
					1.3、雇佣方式：<span>设计图纸</span>
				</view>
				<view>本工程合同总工期按甲方要求，实际开工日期由甲方提前网约，乙方确认为准。</view>
				<view>平台服务内容：平台为雇主和雇工提供一对一服务。</view>
				
				<view class="titOne">如遇下列情况，工期相应顺延（需保留聊天记录）：</view>
				<view>
					1.4.1、停电、电脑损坏；<br/>
					1.4.2、设计开始后有后续添加要求；<br/>
				</view>
				
				<view class="titOne">第二条  合同金额<text class="red ftn">(单价为工人注册填写，面积为测量后填写）</text></view>
				<view class="formCont">
					<view class="table">
						<view class="tr trfat">
							<view class="td">序号</view>
							<view class="td">设计项目</view>
							<view class="td">单位</view>
							<view class="td">面积（m2）</view>
							<view class="td">单价（元/m2）</view>
							<view class="td">小计(元)</view>
						</view>
						<view class="tr" v-for="(item,index) in mainData.products">
							<view class="td">{{index+1}}</view>
							<view class="td">{{item.title}}</view>
							<view class="td">{{item.snap_product.label[item.snap_product.category_id].description}}</view>
							<view class="td">{{item.count}}</view>
							<view class="td">{{item.price}}</view>
							<view class="td">{{item.price*item.count}}</view>
						</view>
					<view class="tr">
						<view class="td">合计</view>
						
						<view class="td" style="width: 90%;">金额:{{mainData.price}}（税点另计）</view>
					</view>
					</view>
				</view>
				<view class="center" style="width: 80%;margin: 0 auto;">注：资金托管至第三方，施工结束后确认付款，至工人账户，材料为全款支付。</view>
				<view class="titOne">第三条   设计流程阶段概述：</view>
				<view>
					第一阶段：策划阶段。<br/>
						开始设计前的准备工作，内容包括（现场勘查测量、各种数据资料收集）。代表合作单位与甲方进一步沟通并且充分了解项目的各种经营功能及需求（风格定位、功能使用等），开始所设计项目的策划及平面规划。
					第二阶段：方案深化阶段<br/>
						⒈ 在平面功能的基础上，深入设计，进行方案的分析和比较。
							①功能分析。
							②交通流线分析。
							③空间分析。
							④装修材料的比较和选择。
						⒉  方案成果为效果图，同时与甲方对于整体效果及风格进行确定。
					第三阶段：施工图阶段<br/>
						⒈ 装修施工图
							①设计说明、工程材料做法表、饰面材料分类表。
							②隔墙定位平面图、平面布置图、铺地平面图、天花布置图、水电布置图。
							③立面图、剖面图。
					第四阶段：配饰设计阶段<br/>
						方案汇报通过后，配饰设计团队对项目进行软装设计。对于方案中的家私、配饰品、布艺、绿植等产品进行细化设计，同时以PDF格式呈现。
				</view>
				<!-- <view class="titOne">第四条  双方责任：</view>
				<view>4.1、甲方责任：</view>
				<view>
					4.1.1、合同签订时向乙方提供施工任务所需的水电，达到乙方要求；<br/>
					4.1.4、甲方（雇佣方）按时支付工程款项。
				</view>
				<view>4.2、乙方责任：</view>
				<view>
					4.2.1、按图纸及国家有关规程规范进行施工，确保施工达到相关质量标准；<br/>
					4.2.2、乙方（被雇佣方）在施工过程中，需确保不破坏其它成品，按规范操作施工，如因乙方原因出现成品损坏，由乙方施工人员承担责任。
				</view> -->
				<view class="titOne">第四条  付款方式：</view>
				<view>
					4.1、款项托管：全款扣除至能工小匠平台账户监管<br/>
					4.2、首期付款：开工确认付款<text class="red">{{ratio}}</text>%至工人账户（不可以提现）<br/>
					4.3、验收后付尾款：验收合格后付付款至工人账户（可申请提现）。
						注：设计完毕后，甲方须在三日内确认，逾期则视为已验收（有争议的设计甲方有权申请退款）。
				</view>
				<view class="titOne">第五条  其他事项：</view>
				<view>
					5.1、本合同涉及所有款项必须汇入能工小匠平台，否则所产生的纠纷乙方概不负责。<br/>
					5.2、本合同自签订之日起即具有法律效力，双方必须完全履行，不得任意变更或解除，因履行本合同发生的争议，由双方友好协商解决，协商不成可向乙方所在地人民法院提起诉讼。<br/>
					5.3、本合同一式<span class="underline">贰</span>联，甲乙方各执<span class="underline">壹</span>联（电子合同）。<br/>
					5.4、其他未尽事宜，双方另行协商解决。<br/>
				</view>
				<!-- <view class="flex" style="align-items: normal;">
					<view class="ftw font14" style="width: 15%;">备注：</view>
					<view class="red" style="width: 85%;">内容内容内容内容内容让你让内容让你人人内容你让内容内容内容内容内容内容让你让内容内容你让内容人</view>
				</view> -->
			</view>
			<view class="ABfangName flexRowBetween">
				<view class="sf jia">
					<view class="one center">甲方</view>
					<view class="center">已电子确认时间为准</view>
				</view>
				<view class="sf yi">
					<view class="one center">乙方</view>
					<view class="comy">单位名称（章）：陕西棒呔劳务有限公司</view>
					<view class="adrs">{{mainData.userInfo&&mainData.userInfo[0]?mainData.userInfo[0].name:''}}</view>
				</view>
				
			</view>
			
			<view class="submitbtn" style="margin-top: 100rpx;">
				<button type="button" v-if="type==0"
				@click="pay()">确认合同</button>
				<button type="button" v-if="type==1"
				@click="orderUpdate()">确认合同</button>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				mainData:{},
				type:'',
				ratio:'',
				showAll:false
			}
		},
		
		onLoad(options) {
			const self = this;
			self.id = options.id;	
			self.type=options.type;
			
			const callback = (res) =>{
				self.$Utils.loadAll(['getMainData'], self)	
			};
			self.$Token.getProjectToken(callback,{refreshToken:true})
				
		},

		methods: {
			
			pay() {
				const self = this;
				if(self.mainData.type==1){
					var ratio = uni.getStorageSync('user_info').thirdApp.custom_rule.work_pay
				}else if(self.mainData.type==2){
					var ratio = uni.getStorageSync('user_info').thirdApp.custom_rule.design_pay
				};
				
				const postData = {};	
				postData.wxPay = {
					price:parseFloat(self.totalPrice).toFixed(2)*(ratio/100)+self.mPrice	
				};
				postData.tokenFuncName = 'getProjectToken',
				postData.searchItem = {
					id: self.id
				};
				postData.saveAfter = [
					{
						tableName: 'Process',
						FuncName: 'add',
						data: {
							type: 1,
							order_no: self.mainData.order_no,
							title:'用户确认合同',
							price:parseFloat(self.totalPrice).toFixed(2)*(ratio/100)+self.mPrice
						}
					}
				];
				const callback = (res) => {
					if (res.solely_code == 100000) {
						if (res.info) {
							const payCallback = (payData) => {
								console.log('payData', payData)
								if (payData == 1) {
									uni.showToast({
										title: '支付成功',
										duration: 1000,
										success: function() {
											
										}
									});
									self.orderUpdate()
								} else {
									uni.setStorageSync('canClick', true);
									uni.showToast({
										title: '支付失败',
										duration: 2000
									});
								};
							};
							self.$Utils.realPay(res.info, payCallback);
						} else {						
							uni.showToast({
								title: '支付成功',
								duration: 1000,
								success: function() {
									
								}
							});
							self.orderUpdate()
						};
					} else {
						uni.setStorageSync('canClick', true);
						uni.showToast({
							title: res.msg,
							duration: 2000
						});
					};
				};
				self.$apis.pay(postData, callback);
			},
			
			orderUpdate() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					order_no: self.mainData.order_no,
					user_type: 0
				};
				postData.data = {
					comfirm: 3
				};
				
				if(self.type==1){
					postData.tokenFuncName = 'getThreeToken';
					postData.data.comfirm = 4;
					postData.data.transport_status = 1;
				}else{
					postData.tokenFuncName = 'getProjectToken';
				};
				postData.saveAfter = [
					{
						tableName: 'Process',
						FuncName: 'add',
						data: {
							type: 1,
							order_no: self.mainData.order_no,
							title:self.type==1?(uni.getStorageSync('threeInfo').identity==1?'工人确认合同':'设计师确认合同'):'用户确认合同'
						}
					}
				];	
	
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
			
			
			getMainData() {
				const self = this;
				const postData = {};			
				postData.searchItem = {
					id:self.id,
					user_type:0
				};
				if(self.type==1){
					postData.tokenFuncName = 'getThreeToken';
				}else{
					postData.tokenFuncName = 'getProjectToken';
				}	
				postData.getAfter = {
					userInfo:{
						tableName:'UserInfo',
						middleKey:'shop_no',
						key:'user_no',
						condition:'=',
						searchItem:{
							status:1
						}
					},	
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData=res.info.data[0];
						self.mainData.create_time = self.mainData.create_time.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,""); ;
						
						self.totalPrice = 0;
						self.mPrice = 0;
						if(self.mainData.type==1){
							self.ratio = uni.getStorageSync('user_info').thirdApp.custom_rule.work_pay
						}else if(self.mainData.type==2){
							self.ratio = uni.getStorageSync('user_info').thirdApp.custom_rule.design_pay
						};
						for (var i = 0; i < self.mainData.products.length; i++) {
							if(self.mainData.products[i].behavior==1){
								self.totalPrice += self.mainData.products[i].price * self.mainData.products[i].count;		
							};
							if(self.mainData.products[i].behavior==2){
								self.mPrice += self.mainData.products[i].price * self.mainData.products[i].count;
							}
						};
						console.log(self.totalPrice)
						self.showAll = true
					} else {
						self.$Utils.showToast(res.msg,'none');
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
