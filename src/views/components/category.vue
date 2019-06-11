<template>
	<div id="category">
		<ul>
			<li v-for="d,index in categoryList" :class="d.gbgoodsId == gbgoodsId && page != 'index' ? 'active' : ''">
				<div class="flex flex-x-between flex-y-center listem" @click="getProductByCategoryId(d)">
					<div class="flex flex-y-center">
						<strong>{{d.name}}</strong>
					</div>
					<div class="arrow-r" v-if="d.childList"></div>
				</div>
				<div class="fenlist flex" v-if="d.childList">
					<div v-for="item,index in d.childList">
						<span @click="getProductByCategoryId(item)">{{item.name}}</span>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import mixin from '../../utils/mixin.js'
	import mixin_store from '../../utils/mixin_store.js'
	export default {
		name: 'shop-category',
		mixins: [mixin, mixin_store],
		props: {
			page: {
				default: 'index'
			}
		},
		data() {
			return {
				// 获取商品参数
				gbgoodsId: '',
				// 分类名称
				gbgoodsName: '',
				// 一级商品分类列表
				categoryList: [],
				// 二级分类列表
				secondCategoryList: []
			}
		},
		created() {
			this.gbgoodsId = this.$route.query.gbgoodsId
			this.gbgoodsName = this.$route.query.gbgoodsName
			// 获取商品分类
			this.getCategoryList()
			// 查询商品
			this.$emit('getProByGbgoodsId', this.gbgoodsId, this.gbgoodsName);
		},
		mounted() {
			$(document).on('click', '#category ul li', function () {
				$(this).addClass('active').siblings().removeClass('active')
			})
		},
		methods: {
			/**
			 * 获取商品分类
			 */
			getCategoryList() {
				if(localStorage.getItem('categoryList')) {
					this.categoryList = JSON.parse(localStorage.getItem('categoryList'))
				} else {
					this.getCategoryListSaveLocal()
				}
			},
			/**
			 * 获取分类列表缓存本地
			 */
			getCategoryListSaveLocal() {
				this.postRequest('category/childList', {
					parentCategoryId: 'top',
					filteEnabled: 1,
					filteDeleted: 0,
					orderField: 't.f_id',
					onlyLv2: true
				}).then(resp => {
					if(resp && resp.data && resp.data.state == 0) {
						// 添加常买选项
						resp.data.aaData.unshift({
							name: '常买',
							id: 'oftenbuy',
							gbgoodsId: 'oftenbuy'
						}) // 商品分类数据
						this.categoryList = resp.data.aaData
						// 缓存分类列表
						localStorage.setItem('categoryList', JSON.stringify(this.categoryList))
					}
				})
			},
			/**
			 * 商品列表页面
			 */
			getProductByCategoryId(d) {
				if(this.page == 'productList') {
					this.$emit('getProByGbgoodsId', d.gbgoodsId, d.name);
				}
				this.$router.push({
					name: 'productList',
					query: {
						gbgoodsId: d.gbgoodsId,
						gbgoodsName: d.name
					}
				})
			}
		},
	}
</script>

<style lang="scss">
	#category {
		ul {
			font-size: 14px;
			padding: 0 10px;
			li:last-child {
				border-bottom: none;
			}
			li.active {
				strong {
					color: #FF4400;
				}
				.arrow-r {
					border-top: 1px solid #FF4400;
					border-right: 1px solid #FF4400;
				}
			}
			li.active {
				.arrow-r {
					border-top: 1px solid #FF4400;
					border-right: 1px solid #FF4400;
					transform: rotate(134deg);
				}
				.fenlist {
					display: block;
					div {
						display: inline-block;
					}
				}
			}
			li {
				.categoryicon{
					margin-right: 10px;
				}
				// padding: 10px 0;
				border-bottom: 1px solid #DDD;
				.out {
					width: 28px;
					height: 28px;
					margin-right: 10px;
					background: rgba(0, 198, 93, 1);
					.in {
						width: 14px;
						height: 14px;
						border-radius: 100px;
						border: 1px solid #222222;
					}
				}
				.listem {
					cursor: pointer;
					padding: 8px 0;
				}
				.fenlist {
					flex-wrap: wrap;
					padding-left: 33px;
					padding-top: 5px;
					transition: all 0.3s;
					display: none;
					div {
						span {
							display: inline-block;
							color: #909090;
							font-size: 12px;
							margin-bottom: 3px;
							cursor: pointer;
							padding: 0 5px;
						}
						span:hover {
							color: #FF4400;
							text-decoration: underline;
						}
						i.line {
							padding: 0 3px;
							color: #909090;
							font-size: 12px;
						}
					}
				}
			}
		}
	}
</style>