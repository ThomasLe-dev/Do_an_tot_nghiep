<template>
    <div>
        <!-- Filter -->
        <header class="layout__header w-100 center-y justify-between">
            <!-- Left: Tìm kiếm Tài sản -->
            <section class="layout__header__left center-y col-gap-11">
                
            </section>
            <!--  -->
            <!-- Right -->
            <section class="layout__header__right center-y col-gap-11">
                <!-- Button thêm phòng ban -->
                <m-button @clickButton="isShowFormAdd = true">
                    <template #icon>
                        <section class="icon add"></section>
                    </template>
                    Thêm phòng ban
                </m-button>
                <!--  -->
            </section>
            <!--  -->
        </header>
        <!--  -->

        <!-- Table -->
        <section class="layout__table flex-column" tabindex="0">
            <!-- Header -->
            <header class="table__header-dep h-40 grid center-y">
                <section class="table__checkbox center relative">
                    <m-checkbox
                        :checked="chooseAll"
                        @change="changeChooseAll"
                        title="Chọn tất cả"
                    />
                </section>
                <section class="table__stt relative show-tooltip">
                    STT
                    <m-tooltip content="Số thứ tự" type="top" />
                </section>
                <section class="table__code">Mã phòng ban</section>
                <section class="table__name">Tên phòng ban</section>
                <section class="table__name">Mô tả phòng ban</section>
                <section class="table__option center">Chức năng</section>
            </header>
            <!--  -->

            <!-- Body -->
            <main class="table__body">
                <section v-if="!isLoadingDataTable">
                    <!-- Khi không có dữ liệu -->
                    <section
                        v-if="listDepartment.length === 0"
                        class="w-100 h-100 center fw-700 font-size-14 mt-200"
                    >
                        {{
                            FixedAssetCodeOrName !== '' ||
                            FixedAssetCategoryName !== '' ||
                            DepartmentName !== ''
                                ? 'Rất tiếc! Không tìm thấy tài sản nào phù hợp.'
                                : 'Không có dữ liệu'
                        }}
                    </section>
                    <!--  -->

                    <!-- Khi có dữ liệu -->
                    <FixedAssetRow
                        v-for="(fixedAsset, index) in listDepartment"
                        :fixedAsset="fixedAsset"
                        :key="fixedAsset.DepartmentId"
                        @changeChecked="checkedCheckbox"
                        :checkAll="chooseAll"
                        :listFixedAssetChoose="listFixedAssetChoose"
                        :index="index + 1 + (pageNumber - 1) * pageLimit"
                        :listDepartment="listDepartment"
                        :listFixedAssetCategory="listFixedAssetCategory"
                        @updateListFixedAsset="updateListFixedAsset"
                    />
                    <!--  -->
                </section>
                <!-- Loading dữ liệu -->
                <section v-else><LoadingSkeleton v-for="i in 20" :key="i" /></section>
                <!--  -->
            </main>

            <!-- Footer -->
            <footer class="table__footer h-40 grid">
                <!-- Footer left -->
                <section class="table__footer_left center-y">
                    <!-- Tổng số tài sản -->
                    <section class="footer__left__info">
                        Tổng số: <span>{{ formatNumber(listDepartment.length) }}</span> bản ghi
                    </section>
                    <!--  -->
                </section>
            </footer>
            <!--  -->

            <!-- Form thêm một tài sản mới -->
            <section class="blur" v-if="isShowFormAdd">
                <section class="assets__edit flex-column px-16 br-4 bg-white pt-16">
                    <m-Dep
                        :title="formTitle.createDepartment"
                        @closePopup="isShowFormAdd = false"
                        @updateListFixedAsset="updateListFixedAsset"
                        :listDepartment="listDepartment"
                        :listFixedAssetCategory="listFixedAssetCategory"
                        :contentBtnSubmit="btnTitleForm.create"
                    />
                </section>
            </section>
            <!--  -->

            <!-- Thông báo warning -->
            <section class="blur center" v-if="isShowToastMessageWarning">
                <m-toast
                    :content="toastMessageWarningContent"
                    :messageRight="messageRight"
                    :messageLeft="messageLeft"
                >
                    <m-button
                        ref="btnCancel"
                        typeButton="outline"
                        v-if="action === 'export' ? true : isDelete"
                        @clickButton="cancelDeleteOrExport"
                        focus
                        >Không</m-button
                    >
                    <m-button
                        @clickButton="
                            action === 'delete' ? deleteFixedAssetChoose() : exportExcelFixedAsset()
                        "
                        focus
                        ref="btnSubmit"
                        >{{ labelButtonWarning }}</m-button
                    >
                </m-toast>
            </section>
            <!--  -->

            <!-- Thông báo thành công -->
            <section class="toast__message" v-if="isShowToastMessage">
                <m-toast :typeToast="toastMessageType" :content="toastMessageContent" />
            </section>
            <!--  -->
        </section>
        <div v-if="isShowToastValidateAriseTransfer" class="blur">
            <TransferToast
                typeToast="warning"
                :content="toast_content_warning + '.'"
                :moreInfo="moreInfo"
            >
                <m-button
                    width="100px"
                    style="border: none"
                    tabindex="1"
                    @click="isShowToastValidateAriseTransfer = false"
                >
                    Đóng
                </m-button>
            </TransferToast>
        </div>
        <div v-if="isShowToastValidateBE" class="blur">
            <TransferToast
                typeToast="warning"
                :content="toast_content_warning + '.'"
                :moreInfo="moreInfo"
            >
                <m-button
                    width="100px"
                    style="border: none"
                    @clickButton="showToast"
                    tabindex="2"
                    @click="isShowToastValidateBE = false"
                >
                    Đồng ý
                </m-button>
            </TransferToast>
        </div>
        <!--  -->
    </div>
</template>

<script>
import FixedAssetCategoryAPI from '/src/api/FixedAssetCategory.API'
import DepartmentAPI from '/src/api/Department.API'
import FixedAssetAPI from '/src/api/FixedAsset.API'
import FixedAssetRow from './FixedAssetRow.vue'
import LoadingSkeleton from './LoadingSkeleton.vue'
import { useIsLoading } from '/src/stores/isLoading.js'
import TransferToast from '../fixed_asset_transfer/TransferToast.vue'

export default {
    name: 'FixedAssetTable',
    /**
     * @author LB.Thành (11/07/2023)
     * @description Khai báo các component sử dụng
     */
    components: {
        FixedAssetRow,
        LoadingSkeleton,
        TransferToast
    },
    /**
     * @author LB.Thành (11/07/2023)
     * @description Khai báo các data sử dụng
     */
    data() {
        return {
            // chọn tất cả
            chooseAll: false,
            // Danh sách tài sản, phòng ban, loại tài sản
            listFixedAssetCategory: [],
            listDepartment: [],
            listFixedAsset: [],
            // Danh sách tài sản được chọn
            listFixedAssetChoose: [],
            // tiêu đề nút xóa
            labelButtonWarning: '',
            // Hiển thị form thêm tài sản
            isShowFormAdd: false,
            // kiểm tra xóa tài sản
            isDelete: false,
            // Kiểm tra xuất excel
            isExport: false,
            // Kiểm tra loading data table
            isLoadingDataTable: false,
            // Các biến dùng để hiển thị thông báo
            isShowToastMessage: false,
            isShowToastMessageWarning: false,
            toastMessageContent: '',
            toastMessageType: 'success',
            toastMessageWarningContent: '',
            messageLeft: '',
            messageRight: '',
            // Các biến dùng để lọc, tìm kiếm
            FixedAssetCategoryName: '',
            DepartmentName: '',
            FixedAssetCodeOrName: '',
            // Các biến dùng để phân trang
            pageNumber: 1,
            pageNumberEnd: 0,
            pageLimit: 20,
            // Tổng số tài sản
            FixedAssetTotal: 0,
            // Check xem là xóa hay là xuất excel
            action: '',
            focusElementToastWarning: 'submit',
            //------------------------------------ Toast --------------------------------
            isShowToastDelete: false,
            toast_content_delete: null,
            isShowToastDeleteSingle: false,
            toast_content_delete_single: null,
            isShowToastValidateBE: false,
            toast_content_warning: null,
            moreInfo: null,
            isShowToastAddSuccess: false,
            isShowToastUpdateSuccess: false,
            toast_content_success: null,
            isShowToastValidateAriseTransfer: false
        }
    },
    /**
     * @author LB.Thành (11/07/2023)
     * @description Khai báo các method sử dụng
     */
    methods: {
        /**
         * @author LB.Thành (08/08/2023)
         * @param
         * @description Lấy ra danh sách các loại tài sản
         */
        async getAllFixedAssetCategory() {
            try {
                const res = await FixedAssetCategoryAPI.getAllFixedAssetCategory()
                this.listFixedAssetCategory = res.data
            } catch (error) {
                this.showToastMessage(true, this.$_MISAResource.error.loadData, 'error')
            }
        },
        /**
         * @author LB.Thành (08/08/2023)
         * @param
         * @description Lấy ra danh sách các loại phòng ban
         */
        async getAllDepartment() {
            try {
                const res = await DepartmentAPI.getAllDepartment()
                this.listDepartment = res.data
            } catch (error) {
                this.showToastMessage(true, this.$_MISAResource.error.loadData, 'error')
            }
            setTimeout(() => {
                this.isLoadingDataTable = false
            }, 1000)
        },
        /**
         * @author LB.Thành (08/08/2023)
         * @param {*} fixedAssetFilter Các điều kiện lọc tài sản (tên tài sản, mã tài sản, tên loại tài sản, tên phòng ban)
         * @description Lấy ra danh sách các tài sản theo điều kiện lọc
         */
        async getAllFixedAsset(fixedAssetFilter) {
            try {
                this.isLoadingDataTable = true
                const res = await FixedAssetAPI.getFixedAssetPaging(fixedAssetFilter)
                this.listFixedAsset = res.data.FixedAssets
                this.pageNumberEnd = Math.ceil(res.data.TotalRecords / this.pageLimit)
                this.FixedAssetTotal = res.data.TotalRecords
            } catch (error) {
                this.showToastMessage(true, this.$_MISAResource.error.loadData, 'error')
            }
            setTimeout(() => {
                this.isLoadingDataTable = false
            }, 1000)
        },
        /**
         * @author LB.Thành (11/07/2023)
         * @param
         * Xử lý logic khi xóa tài sản
         */
        async deleteFixedAssetChoose() {
            try {
                if (this.isDelete) {
                    this.setIsLoading(true)
                    if (this.listFixedAssetChoose.length === 1) {
                        await FixedAssetAPI.deleteFixedAssetById(this.listFixedAssetChoose[0])
                    } else {
                        await FixedAssetAPI.deleteManyFixedAsset(this.listFixedAssetChoose)
                    }
                    setTimeout(() => {
                        this.setIsLoading(false)
                    }, 1000)
                    this.listFixedAssetChoose = []
                    this.messageLeft = ''
                    this.messageRight = ''
                    this.isShowToastMessageWarning = false
                    this.toastMessageWarningContent = ''
                    this.updateListFixedAsset('delete')
                    this.pageNumber = 1
                    this.chooseAll = false
                } else {
                    this.isShowToastMessageWarning = false
                    this.toastMessageWarningContent = ''
                }
            } catch (error) {
                console.log(error)
            }
        },
        /**
         * @param {*}
         * @description Xuất dữ liệu tài sản ra file Excel
         * @Author LB.Thành (08/08/2023)
         */
        async exportExcelFixedAsset() {
            try {
                this.setIsLoading(true)
                let res
                if (this.listFixedAssetChoose.length > 0) {
                    res = await FixedAssetAPI.exportExcelFixedAsset(this.listFixedAssetChoose)
                } else {
                    const list = await FixedAssetAPI.getAllFixedAsset()
                    const listId = list.data.map((item) => item.FixedAssetId)
                    res = await FixedAssetAPI.exportExcelFixedAsset(listId)
                }
                setTimeout(() => {
                    this.setIsLoading(false)
                    let blob = new Blob([res.data], {
                        type: res.headers['content-type'],
                        headers: res.headers
                    })
                    const a = document.createElement('a')
                    a.href = window.URL.createObjectURL(blob)
                    a.download = this.$_MISAResource.VN.fileNameExcel
                    a.click()
                    a.remove()
                    this.listFixedAssetChoose = []
                    this.messageLeft = ''
                    this.messageRight = ''
                    this.isShowToastMessageWarning = false
                    this.toastMessageWarningContent = ''
                    this.chooseAll = false
                }, 1000)
            } catch (error) {
                console.log(error)
            }
        },
        /**
         * @author LB.Thành (08/08/2023)
         * @param {*} action Cập nhật lại danh sách tài sản sau khi thêm, sửa, xóa
         */
        updateListFixedAsset(action) {
            // Cập nhật lại trang
            this.isLoadingDataTable = true
            this.getAllDepartment()
            setTimeout(() => {
                this.showToastMessage(true, this.$_MISAResource.VN.success[action], 'success')
            }, 1100)
        },

        /**
         * @author LB.Thành (08/08/2023)
         * @param
         * Lọc tài sản
         */
        filterListFixedAsset() {
            this.pageNumber = 1
            this.getAllFixedAsset(this.fixedAssetFilter)
        },
        /**
         * @author LB.Thành (11/07/2023)
         * @param {id, checked}
         * Xử lý logic khi check checkbox
         */
        checkedCheckbox(id, checked) {
            if (checked) {
                // Nếu chưa có trong danh sách thì thêm vào
                if (!this.listFixedAssetChoose.includes(id)) {
                    this.listFixedAssetChoose.push(id)
                    this.isDelete = true
                }

                // Nếu đã chọn tất cả thì check all
                if (this.listFixedAssetChoose.length === this.listFixedAsset.length) {
                    this.chooseAll = true
                }
            } else {
                // Nếu đã có trong danh sách thì xóa đi
                if (this.listFixedAssetChoose.includes(id)) {
                    this.listFixedAssetChoose.splice(this.listFixedAssetChoose.indexOf(id), 1)
                }

                // Nếu không còn phần tử nào trong danh sách thì không cho xóa
                if (this.listFixedAssetChoose.length === 0) {
                    this.isDelete = false
                }

                // Bỏ chọn một checked row thì bỏ chọn checkAll
                if (this.chooseAll) {
                    this.chooseAll = false
                }
            }
        },
        /**
         * @author LB.Thành (11/07/2023)
         * @param
         * Xử lý logic khi check all
         */
        changeChooseAll(value) {
            this.chooseAll = value
            if (this.chooseAll) {
                // chọn tất cả
                this.listFixedAssetChoose = [
                    ...this.listFixedAssetChoose,
                    ...this.listFixedAsset.map((item) => item.FixedAssetId)
                ]
                this.isDelete = true
            } else {
                // bỏ chọn tất cả
                this.listFixedAssetChoose = this.listFixedAssetChoose.filter(
                    (item) => !this.listFixedAssetId.includes(item)
                )
                if (this.listFixedAssetChoose.length === 0) {
                    this.isDelete = false
                }
            }
        },
        /**
         * @author LB.Thành (11/07/2023)
         * @param
         * Hiển thị cảnh báo khi xóa tài sản
         */
        showWarning(action) {
            this.action = action
            this.isShowToastMessageWarning = true
            // Nếu có thể xóa được hoặc xuất file Excel
            if (this.isDelete) {
                // Nếu chỉ có 1 tài sản được chọn
                if (this.listFixedAssetChoose.length === 1) {
                    this.toastMessageWarningContent =
                        this.$_MISAResource.VN[`${this.action}Warning`][`${this.action}One`]

                    let fixedAssetCode = this.listFixedAsset.find(
                        (item) => item.FixedAssetId === this.listFixedAssetChoose[0]
                    ).FixedAssetCode

                    let nameFixedAsset = this.listFixedAsset.find(
                        (item) => item.FixedAssetId === this.listFixedAssetChoose[0]
                    ).FixedAssetName
                    this.messageRight = `${fixedAssetCode} - ${nameFixedAsset}?`
                } else {
                    // Nếu có nhiều hơn 1 tài sản được chọn
                    this.toastMessageWarningContent =
                        this.$_MISAResource.VN[`${this.action}Warning`][`${this.action}Many`]
                    if (this.listFixedAssetChoose.length >= 10) {
                        this.messageLeft = `${this.listFixedAssetChoose.length} `
                    } else {
                        this.messageLeft = `0${this.listFixedAssetChoose.length} `
                    }
                }
                this.labelButtonWarning = this.action === 'delete' ? 'Xóa' : 'Xuất'
            } else {
                // Nếu không thể xóa được do chưa chọn tài sản nào
                if (this.listFixedAssetChoose.length == 0) {
                    if (this.action === 'export') {
                        this.toastMessageWarningContent =
                            this.$_MISAResource.VN[`${this.action}Warning`][
                                `${this.action}AllLeft`
                            ] +
                            this.FixedAssetTotal +
                            this.$_MISAResource.VN[`${this.action}Warning`][
                                `${this.action}AllRight`
                            ]
                        this.labelButtonWarning = 'Xuất'
                    } else {
                        this.toastMessageWarningContent =
                            this.$_MISAResource.VN[`${this.action}Warning`][`${this.action}Block`]
                        this.labelButtonWarning = 'Đóng'
                    }
                }
            }
        },
        /**
         * @author LB.Thành (11/07/2023)
         * @param
         * Hủy xóa tài sản
         */
        cancelDeleteOrExport() {
            this.isShowToastMessageWarning = false
            this.toastMessageWarningContent = ''
            this.messageLeft = ''
            this.messageRight = ''
        },
        /**
         * @author LB.Thành (11/07/2023)
         * @param {isShow, message, type}
         * Hiện thông báo khi xử lý logic thành công
         */
        showToastMessage(isShow, content, type) {
            this.isShowToastMessage = isShow
            this.toastMessageContent = content
            this.toastMessageType = type
            this.saveTimer = setTimeout(() => {
                this.isShowToastMessage = false
            }, 3000)
        },
        /**
         * @author LB.Thành (11/07/2023)
         * @param {*} number
         * Format số
         */
        formatNumber(number) {
            if (number !== undefined && number !== null) {
                return number
                    .toString()
                    .replace(/\./g, '')
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
            } else {
                // Xử lý khi biến number là undefined hoặc null
                return '0' // Hoặc giá trị mặc định khác tùy bạn chọn
            }
        },

        /**
         * @description Xử lý khi thay đổi số bản ghi trên 1 trang
         * @param {*} value
         * Author: LB.Thành (08/08/2023)
         */
        changeRecordOfPage(value) {
            this.recordOfPage = value
        }
    },
    async created() {
        // Lấy dữ liệu danh sách loại tài sản
        await this.getAllFixedAssetCategory()
        // Lấy dữ liệu danh sách phòng ban
        await this.getAllDepartment()
        // Lấy dữ liệu danh sách tài sản
        await this.getAllFixedAsset(this.fixedAssetFilter)
    },
    /**
     * @author LB.Thành (11/07/2023)
     * @description Xử lý data
     */
    computed: {
        /**
         * @description sách tên loại tài sản
         * @author LB.Thành (08/08/2023)
         */
        listFixedAssetCategoryName() {
            return this.listFixedAssetCategory.map((item) => item.FixedAssetCategoryName)
        },
        /**
         * @description Danh sách tên phòng ban
         * @author LB.Thành (08/08/2023)
         */
        listDepartmentName() {
            return this.listDepartment.map((item) => item.DepartmentName)
        },
        /**
         * @description Danh sách mã tài sản
         */
        listFixedAssetId() {
            return this.listFixedAsset.map((item) => item.FixedAssetId)
        },
        /**
         * @description Các điều kiện lọc
         * @author LB.Thành (08/08/2023)
         */
        fixedAssetFilter() {
            return {
                FixedAssetCodeOrName: this.FixedAssetCodeOrName,
                DepartmentName: this.DepartmentName,
                FixedAssetCategoryName: this.FixedAssetCategoryName,
                PageLimit: this.pageLimit,
                PageNumber: this.pageNumber
            }
        },
        /**
         * @description Tổng số lượng tài sản hiện có trong trang hiện tại
         * @returns {number} tổng giá số lượng sản trong trang hiện tại
         * @author LB.Thành (08/08/2023)
         */
        quantityTotal() {
            return this.listFixedAsset.reduce((total, item) => {
                return total + item.Quantity
            }, 0)
        },
        /**
         * @description Tổng giá trị tất cả tài sản hiện có trong trang hiện tại
         * @returns {number} tổng giá trị tài sản trong trang hiện tại
         * @author LB.Thành (08/08/2023)
         */
        costTotal() {
            return this.listFixedAsset.reduce((total, item) => {
                return total + item.Cost
            }, 0)
        },
        /**
         * @description Tổng giá trị hao mòn khấu hao tài sản hiện có trong trang hiện tại
         * @returns {number} Tổng giá trị hao mòn khấu hao tài sản hiện có trong trang hiện tại
         * @author LB.Thành (08/08/2023)
         */
        depreciationTotal() {
            // Lấy thời điểm hiện tại
            var currentDate = new Date()

            // Sử dụng phương thức reduce để tính tổng giá trị khấu hao lũy kế
            var totalDepreciation = this.listFixedAsset.reduce((total, item) => {
                // Chuyển định dạng StartUsingDate từ chuỗi sang đối tượng Date
                var startUsingDate = new Date(item.StartUsingDate)

                // Tính số năm đã trôi qua từ thời điểm StartUsingDate đến thời điểm hiện tại
                var yearsPassed = currentDate.getFullYear() - startUsingDate.getFullYear()

                // Tính giá trị khấu hao lũy kế cho từng tài sản và cộng vào tổng
                return total + yearsPassed * ((item.DepreciationRate / 100) * item.Cost)
            }, 0)

            return totalDepreciation.toFixed(0)
        },
        /**
         * @description Tổng giá trị còn lại tài sản hiện có trong trang hiện tại
         * @returns {number} Tổng giá trị còn lại tài sản hiện có trong trang hiện tại
         * @author LB.Thành (08/08/2023)
         */
        remainingTotal() {
            return this.costTotal - this.depreciationTotal
        },
        /**
         * @description Kiểm tra xem có đang load dữ liệu hay không
         * @author LB.Thành (27-07-2023)
         */
        isLoading() {
            return useIsLoading().isLoading
        },
        /**
         * @description Thay đổi trạng thái load dữ liệu
         * @author LB.Thành (27-07-2023)
         */
        setIsLoading() {
            return useIsLoading().setIsLoading
        },
        formTitle() {
            return this.$_MISAResource.VN.formTitle
        },
        btnTitleForm() {
            return this.$_MISAResource.VN.btnTitleForm
        },
        btnTitleToast() {
            return this.$_MISAResource.VN.btnTitleToast
        },
        tableHeaderTitle() {
            return this.$_MISAResource.VN.tableHeaderTitle
        },
        btnTitle() {
            return this.$_MISAResource.VN.btnTitle
        }
    },
    watch: {
        /**
         * @author LB.Thành (11/07/2023)
         * @description Xử lý khi thay đổi số trang
         */
        async pageNumber() {
            await this.getAllFixedAsset(this.fixedAssetFilter)
            let check = true
            this.listFixedAssetId.forEach((item) => {
                if (!this.listFixedAssetChoose.includes(item)) {
                    check = false
                }
            })
            this.chooseAll = check
        },
        /**
         * @author LB.Thành (11/07/2023)
         * @description Xử lý khi thay đổi số bản ghi trong một trang
         */
        pageLimit() {
            this.pageNumber = 1
            this.getAllFixedAsset(this.fixedAssetFilter)
        },
        FixedAssetCodeOrName(value) {
            if (value === '' && this.FixedAssetCategoryName === '' && this.DepartmentName === '') {
                this.getAllFixedAsset(this.fixedAssetFilter)
            }
        },
        DepartmentName(value) {
            if (
                value === '' &&
                this.FixedAssetCategoryName === '' &&
                this.FixedAssetCodeOrName === ''
            ) {
                this.getAllFixedAsset(this.fixedAssetFilter)
            }
        },
        FixedAssetCategoryName(value) {
            if (value === '' && this.FixedAssetCodeOrName === '' && this.DepartmentName === '') {
                this.getAllFixedAsset(this.fixedAssetFilter)
            }
        }
    }
}
</script>
