export default {
	data() {
		return {
			// 供应商id
			sellerId: '',
			sellerName: '',
			// 供应商列表
			sellerList: [],
			// 供应商信息
			sellerInfo: {},
			// 供应商店铺信息
			storeInfo: {},
			// 供应商店铺评分 
			reputationLevel: 'A',
			reputationVal: 5,

			// 商品分类国标码
			keyWord: '',
			gbgoodsId: '',
			pageNum: 1,
			pageSize: 8,
			productList: [],
			productDataCount: 0,

			// 收藏的供应商
			collectionStores: [],

			// 消息列表
			megList: [],
			proLoading: false
		}
	},
	watch: {
		//		sellerId: 'getProductList'
	},
	methods: {
		/**
		 * 获取登录用户的供应商列表
		 */
		getSellers() {
			this.postRequest('suppliercollection/querySellerByCustomerId', {
				customerId: this.userInfo.typeCode
			}).then(resp => {
				if (resp.data && resp.data.state == 0) {
					this.sellerList = resp.data.aaData
					// 默认选择第一个供应商
					if (this.sellerList.length > 0) {
						// 获取全局供应商id
						if (this.$store.getters.selecedSellerInfo.sellerId) {
							this.sellerId = this.$store.getters.selecedSellerInfo.sellerId
							this.sellerName = this.$store.getters.selecedSellerInfo.sellerName
						} else {
							this.sellerId = this.sellerList[0].sellerId
							this.sellerName = this.sellerList[0].sellerName
						}
						// 获取供应商信用等级
						this.getReputation(this.sellerId)
						// 传递供应商id
						this.$emit('getSellerId', {
							sellerId: this.sellerId
						})
					}
				}
			})
		},
		/**
		 * 获取客户类型
		 */
		getisChoiceSupplier() {
			return new Promise((resolve, reject) => {
				this.postRequest('customer/queryById', {
					id: this.userInfo.typeCode
				}).then(resp => {
					if (resp.data && resp.data.aaData) {
						resolve(resp.data.aaData.isChoiceSupplier)
					}
				})
			})
		},
		/**
		 * 获取商品列表
		 */
		getProductList() {
			this.proLoading = true
			// 一批获取商品
			let purl = 'product/getProByQuotationForYP'
			if (this.userInfo && (this.userInfo.userType == "003"||this.userInfo.userType == "002"||this.userInfo.userType == "004"||this.userInfo.userType == "008")) { /** 自营平台需求变更 002 004还是在一批处购买 */
        // 自营平台
        purl = "product/getProByQuotationForBH";
      }
			let param
			if (this.userInfo) {
				param = {
					purchaserId: this.userInfo.typeCode,
					buyerId: this.userInfo.typeCode,
					supplierId: this.sellerId || '',
					gbgoodsid: this.gbgoodsId,
					keyWord: this.keyWord,
					pageSize: this.pageSize,
					pageNum: this.pageNum
				}
			} else {
				param = {
					supplierId: this.sellerId || '',
					gbgoodsid: this.gbgoodsId,
					keyWord: this.keyWord,
					pageSize: this.pageSize,
					pageNum: this.pageNum
				}
			}
			if (this.sellerId == '') {
				delete param.supplierId
			}
			this.postRequest(purl, param).then(resp => {
				this.proLoading = false
				if (resp.data && resp.data.state == 0) {
					this.productList = resp.data.aaData
					this.$store.dispatch('setProductList_AC', resp.data.aaData)
					this.productDataCount = resp.data.dataCount
				}
			})
		},
		/**
		 * 切换供应商
		 */
		sellerChange(val) {
			this.$emit('getSellerId', {
				sellerId: val
			})
			for (let i of this.sellerList) {
				if (i.sellerId == val) {
					this.sellerName = i.sellerName
					this.sellerId = val
					// 全局供应商id
					this.$store.dispatch('setSelecedSeller_AC', {
						sellerId: val,
						sellerName: i.sellerName
					})
				}
			}

			this.getReputation(val)
			this.getProductList()
		},
		/**
		 * 获取店铺信息
		 */
		getStore(sellerId, cb) {
			this.postRequest('store/queryBySellerId', {
				sellerId: sellerId
			}).then(resp => {
				if (resp.data && resp.data.state == 0) {
					if (resp.data.aaData) {
						cb && cb(resp.data.aaData)
					}
				}
			})
		},
		/**
		 * 查看店铺详情
		 */
		toShopDetails() {
			this.$router.push({
				name: 'ShopDetails',
				query: {
					sellerid: this.sellerId
				}
			})
		},
		/**
		 * 店铺信用等级
		 */
		getReputation(sellerId) {
			this.postRequest('reputation/list', {
				customerId: sellerId
			}).then(resp => {
				if (resp.data && resp.data.state == 0) {
					if (resp.data.aaData.length > 0) {
						switch (resp.data.aaData[0].reputationLevel) {
							case 'A':
								this.reputationVal = 5
								this.reputationLevel = 'A'
								break;
							case 'B':
								this.reputationVal = 4
								this.reputationLevel = 'B'
								break;
							case 'C':
								this.reputationVal = 3
								this.reputationLevel = 'C'
								break;
							case 'D':
								this.reputationVal = 2
								this.reputationLevel = 'D'
								break;
							default:
								this.reputationVal = 1
								this.reputationLevel = 'E'
								break;
						}
					} else {
						this.reputationVal = 5
						this.reputationLevel = 'A'
					}
				}
			})
		},
		// 获取消息列表
		getUserMessage() {
			this.postRequest('platformnoticeflow/list', {
				customerId: this.userInfo.userId,
				pageNum: 1,
				pageSize: 3
			}).then(d => {
				if (d.data && d.data.state == 0) {
					this.megList = d.data.aaData
				}
			})
		},
		/**
		 * 获取收藏的供应商
		 */
		getCollectionStores(type) {
			this.postRequest('suppliercollection/querySellerByCustomerId', {
				customerId: this.userInfo.typeCode,
			}).then(resp => {
				if (resp.data && resp.data.state == 0) {
					if (resp.data.aaData) {
						var a = []
						for (var i in resp.data.aaData) {
							(function(i) {
								this.getStore(resp.data.aaData[i].sellerId, (store) => {
									var o = Object.assign(store, resp.data.aaData[i])
									if (type == 'collectionStore') {
										this.postRequest('productsku/getSkuByOftenBuy', {
											code: '',
											purchaserId: this.userInfo.typeCode,
											supplierId: resp.data.aaData[i].sellerId,
											keyWord: '',
											pageNum: 1,
											pageSize: 5
										}).then(resp => {
											if (resp && resp.data && resp.data.state == 0) {
												o.skus = resp.data.aaData
												a.push(o)
											}
										})
										return false
									}
									a.push(o)
								})
							}.bind(this))(i)
						}
						this.collectionStores = a
					}
				}
			})
		},
		/**
		 * 获取商品规格列表
		 */
		createProductcollection(item) {
			if (item.isCollection == 0) {
				var param = {
					customerId: this.userInfo.typeCode - 0,
					sellerId: this.sellerId,
					sellerName: this.sellerName,
					productId: item.productId,
					productName: item.productName,
					skuId: item.id,
					skuName: item.name,
				}
				this.postRequest('productcollection/create', param).then(d => {
					if (d.data && d.data.state == 0) {
						item.isCollection = 1
						this.$message({
							message: '收藏商品成功！',
							type: 'success',
						});

					} else {
						this.$message.error(d.data.msg)
					}
				})
			} else {
				this.postRequest('productcollection/deleteByCustomerIdAndSkuId', {
					customerId: this.userInfo.typeCode - 0,
					skuId: item.id
				}).then(d => {
					if (d.data && d.data.state == 0) {
						item.isCollection = 0
						this.$message({
							message: '取消收藏！',
							type: 'success',
						});
					} else {
						this.$message.error(d.data.msg)
					}
				})
			}
		},
		// 个人 团采关注店铺
    guanzhu(data) {
			console.log(data)
      this.postRequest("suppliercollection/create", {
        customerId: this.userInfo.typeCode,
        customerName: this.userInfo.nickName, //	采购商名称
        sellerId: data.f_seller_id, //供应商Id
        sellerName: data.f_contacts //供应商名称
      }).then(d => {
        if (d.data && d.data.state == 0) {
					data.isCollection = 1;
					data.collectionId = d.data.aaData.id
          this.$message({
						message: '收藏成功！',
						type: 'success',
					});
        }
      });
    },
    // 取消关注店铺
    quxiaoguanzhu(data) {
			console.log(data)

      this.postRequest("suppliercollection/delete", {
        id: data.collectionId || ""
      }).then(d => {
        if (d.data && d.data.state == 0) {
					data.isCollection = 0;
					this.$message({
						message: '取消收藏',
						type: 'success',
					});
        }
      });
    },
	}
}
