import http from "./http.js";
import config from "@/config/index.config.js";


export default {


	WxJssdk(param, callback) {

		var allParams = {
			url: 'WxJssdk',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	register(param, callback) {

		var allParams = {
			url: 'Project/Solely/register',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},
	
	registerS(){
		var allParams = {
			url: 'Func/Common/loginByUp',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	bindShop(param, callback) {

		var allParams = {
			url: 'Project/Solely/bindShop',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	monthFlow(param, callback) {

		var allParams = {
			url: 'Project/Solely/monthFlow',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	teamTotal(param, callback) {

		var allParams = {
			url: 'Project/Solely/teamTotal',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	teamFlow(param, callback) {

		var allParams = {
			url: 'Project/Solely/teamFlow',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	teamOrder(param, callback) {

		var allParams = {
			url: 'Project/Solely/teamOrder',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	teamRank(param, callback) {

		var allParams = {
			url: 'Project/Solely/teamRank',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},


	getTeam(param, callback) {

		var allParams = {
			url: 'Project/Solely/getTeamv',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	SkuDateGet(param, callback) {
		var allParams = {
			url: 'Common/SkuDate/get',
			type: 'post',
			noToken: true,
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	labelGet(param, callback) {
		var allParams = {
			url: 'Common/Label/get',
			type: 'post',
			noToken: true,
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},
	
	orderItemGet(param, callback) {
		var allParams = {
			url: 'Common/OrderItem/get',
			type: 'post',
			noToken: true,
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},
	
	
	orderItemUpdate(param, callback) {
		var allParams = {
			url: 'Common/OrderItem/update',
			type: 'post',
			noToken: true,
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},
	
	
	
	

	tokenGet(param, callback) {
		var allParams = {
			url: 'Project/Solely/getToken',
			type: 'post',
			noToken: true,
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	articleGet(param, callback) {
		
		var allParams = {
			url: 'Common/Article/get',
			type: 'post',
			noToken: true,
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},
	
	processGet(param, callback) {
		
		var allParams = {
			url: 'Common/Process/get',
			type: 'post',
			noToken: true,
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},
	
	processAdd(param, callback) {
		
		var allParams = {
			url: 'Common/Process/add',
			type: 'post',
			noToken: true,
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},
	
	messageGet(param, callback) {
		
		var allParams = {
			url: 'Common/Message/get',
			type: 'post',
			noToken: true,
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},
	
	messageUpdate(param, callback) {
		
		var allParams = {
			url: 'Common/Message/update',
			type: 'post',
			noToken: true,
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},
	
	messageAdd(param, callback) {
		
		var allParams = {
			url: 'Common/Message/add',
			type: 'post',
			noToken: true,
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	userGet(param, callback) {
		var allParams = {
			url: 'Base/User/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},
	userUpdate(param, callback) {
		var allParams = {
			url: 'Base/User/update',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	userInfoGet(param, callback) {
		var allParams = {
			url: 'Common/UserInfo/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	userInfoUpdate(param, callback) {
		var allParams = {
			url: 'Common/UserInfo/update',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},


	codeGet(param, callback) {
		var allParams = {
			url: 'Project/Solely/getCode',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},
	
	productAdd(param, callback) {
		if(!param.hasContent){
			param.noContent = true;
		};
		var allParams = {
			url: 'Common/Product/add',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	productGet(param, callback) {
		if(!param.hasContent){
			param.noContent = true;
		};
		var allParams = {
			url: 'Common/Product/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},
	
	productUpdate(param, callback) {
		
		var allParams = {
			url: 'Common/Product/update',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},
	
	qrDateGet(param, callback) {
		var allParams = {
			url: 'Common/QrDate/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},



	getQrCommonCode(param, callback) {
		var allParams = {
			url: 'Base/Qr/PHPQrGet',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	qrCodeGet(param, callback) {
		var allParams = {
			url: 'Common/Qrcode/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	qrCodeUpdate(param, callback) {
		var allParams = {
			url: 'Common/Qrcode/update',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},


	login(param, callback) {

		var allParams = {
			url: 'Func/Common/loginByCode',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},
	
	

	superLogin(param, callback) {

		var allParams = {
			url: 'Func/Common/loginByUp',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	wechatGet(param, callback) {
		var allParams = {
			url: 'Common/Wechat/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	skuGet(param, callback) {
		var allParams = {
			url: 'Common/Sku/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},
	
	cardGet(param, callback) {
		var allParams = {
			url: 'Common/UserCard/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},
	
	cardUpdate(param, callback) {
		var allParams = {
			url: 'Common/UserCard/update',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},
	
	cardDelete(param, callback) {
		var allParams = {
			url: 'Common/UserCard/delete',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},
	
	cardAdd(param, callback) {
		var allParams = {
			url: 'Common/UserCard/add',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	addressGet(param, callback) {
		var allParams = {
			url: 'Common/UserAddress/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	addressUpdate(param, callback) {
		var allParams = {
			url: 'Common/UserAddress/update',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	addressDelete(param, callback) {
		var allParams = {
			url: 'Common/UserAddress/delete',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	addressAdd(param, callback) {
		var allParams = {
			url: 'Common/UserAddress/add',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	userCouponGet(param, callback) {
		var allParams = {
			url: 'Common/UserCoupon/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	orderGet(param, callback) {
		var allParams = {
			url: 'Common/Order/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	orderUpdate(param, callback) {
		var allParams = {
			url: 'Common/Order/update',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	orderDelete(param, callback) {
		var allParams = {
			url: 'Common/Order/delete',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},



	addOrder(param, callback) {
		var allParams = {
			url: 'Func/Order/addOrder',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	pay(param, callback) {
		var allParams = {
			url: 'Base/Pay/pay',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	flowLogGet(param, callback) {
		var allParams = {
			url: 'Common/FlowLog/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	flowLogAdd(param, callback) {
		var allParams = {
			url: 'Common/FlowLog/add',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},


	orderGet(param, callback) {
		var allParams = {
			url: 'Common/Order/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},



	distriGet(param, callback) {
		var allParams = {
			url: 'Common/Distribution/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},
	
	logAdd(param, callback) {
		var allParams = {
			url: 'Common/Log/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},
	
	logUpdate(param, callback) {
		var allParams = {
			url: 'Common/Log/update',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},
	
	addVirtualOrder(param, callback) {
		var allParams = {
			url: 'Func/Order/addVirtualOrder',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	}

}
