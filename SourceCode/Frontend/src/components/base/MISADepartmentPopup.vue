<template>
    <div>
        <form class="t-popup d-popup" ref="form" @keyup.esc="showToast">
            <header class="t-popup__header center-y justify-between w-100 h-36">
                <h1 class="t-popup__header--title">{{ title }}</h1>
                <section class="wrapper-icon" @click="showToast" title="Thoát">
                    <section class="icon t-popup__header--close"></section>
                </section>
            </header>
            <main class="t-popup__header--body edit__body">
                <m-input
                    ref="fixedAssetCode"
                    classLabel="fixedAssetCode"
                    :label="labelForm.DepartmentCode"
                    :placeholder="placeholderForm.FixedAssetCode"
                    placeholderItalics
                    v-model="DepartmentCode"
                    @focus="setInputFocus('fixedAssetCode')"
                    maxlength="50"
                    required
                    tabindex="1"
                    :readonly="isTransfer"
                />

                
                <m-input
                    ref="fixedAssetName"
                    :label="labelForm.DepartmentName"
                    :placeholder="placeholderForm.FixedAssetName"
                    placeholderItalics
                    v-model="DepartmentName"
                    @focus="setInputFocus('fixedAssetName')"
                    maxlength="100"
                    required
                />
                
                <m-input
                    classLabel="fixedAssetName"
                    :label="labelForm.Note"
                    tabindex="-1"
                    v-model="DepartmentDescription"
                    required
                />



            </main>

            <footer class="t-popup__footer center-y">
                <m-button
                    typeButton="outline"
                    width="100px"
                    style="border: none"
                    @clickButton="showToast"
                    tabindex="12"
                >
                    Hủy
                </m-button>
                <m-button width="100px" @clickButton="submit" tabindex="11">{{
                    contentBtnSubmit
                }}</m-button>
            </footer>
        </form>

        <section class="blur center" v-if="isShowToastCancel">
            <m-toast
                typeToast="warning"
                :content="
                    action === 'update'
                        ? $_MISAResource.VN.warningCancel.noUpdate
                        : $_MISAResource.VN.warningCancel.noCreate
                "
                @keyup="
                    (event) => {
                        if (
                            (event.key === 'ArrowLeft' || event.key === 'Tab') &&
                            focusToastWaring === 'cancel'
                        ) {
                            focusToastWaring = 'no'
                        }
                        if (
                            (event.key === 'ArrowRight' || event.key === 'Tab') &&
                            focusToastWaring === 'no'
                        ) {
                            focusToastWaring = 'cancel'
                        }
                    }
                "
            >
                <m-button
                    typeButton="outline"
                    @clickButton="
                        ;(isShowToastCancel = false),
                            $refs[this.inputFocus].focus(),
                            (focusToastWaring = 'cancel')
                    "
                    :focus="focusToastWaring === 'no'"
                    >Không</m-button
                >
                <m-button @clickButton="closePopup" :focus="focusToastWaring === 'cancel'"
                    >Hủy bỏ</m-button
                >
            </m-toast>
        </section>

        <section class="blur center" v-if="isShowToastCancelEdit">
            <m-toast typeToast="warning" :content="$_MISAResource.VN.warningCancel.edit">
                <m-button typeButton="outline" @clickButton="isShowToastCancelEdit = false"
                    >Hủy bỏ</m-button
                >
                <m-button typeButton="sub" @clickButton="closePopup">Không lưu</m-button>
                <m-button @clickButton="submit" focus>Lưu</m-button>
            </m-toast>
        </section>

        <!-- Warning Validate Dữ liệu-->
        <section class="blur center" v-if="isShowToastValidateData">
            <m-toast
                typeToast="warning"
                :content="errorMessage === '' ? contentValidate.message : errorMessage"
                :messageRight="messageValidateData"
            >
                <m-button @clickButton="closeToastValidate()" focus>Đóng</m-button>
            </m-toast>
        </section>

        <!-- Validate Nghiệp vụ -->
        <section class="blur center" v-if="isShowToastValidate">
            <m-toast typeToast="warning" :content="messageValidate">
                <m-button @clickButton="closeToastValidate" focus>Đóng</m-button>
            </m-toast>
        </section>
    </div>
</template>

<script>
import FixedAssetAPI from '/src/api/FixedAsset.API'
import DepartmentAPI from '/src/api/Department.API'
import { useIsLoading } from '/src/stores/isLoading.js'

export default {
    name: 'MISADepartmentPopup',
    /**
     * @author LB.Thành (04-07-2023)
     * @param
     * @description Đinh nghĩa props cho component
     */
    props: {
        /**
         * @description Tiêu đề popup
         * @type String
         * @default Popup
         * @Author LB.Thành (04/07/2021)
         */
        title: {
            type: String,
            default: 'Popup'
        },
        fixedAsset: {
            type: Object,
            default: () => ({})
        },
        listDepartment: {
            type: Array,
            default: () => []
        },
        listFixedAssetCategory: {
            type: Array,
            default: () => []
        },
        action: {
            type: String,
            default: 'create'
        },
        contentBtnSubmit: {
            type: String,
            default: 'Lưu'
        }
    },
    data() {
        return {
            // Data from
            FixedAssetId: null,
            FixedAssetCode: '',
            FixedAssetName: '',
            DepartmentCode: '',
            DepartmentName: '',
            FixedAssetCategoryCode: '',
            FixedAssetCategoryName: '',
            Quantity: '',
            isTransfer: false,
            Cost: '',
            LifeTime: '',
            TrackedYear: '',
            DepreciationRate: '',
            YearDepreciation: '',
            PurchaseDate: '',
            StartUsingDate: '',
            //
            FixedAssetCategoryId: '',
            DepartmentId: '',
            //
            isShowToastCancel: false,
            isShowToastCancelEdit: false,
            isShowToastValidateData: false,
            isShowToastValidate: false,
            messageValidate: '',
            messageValidateData: '',
            inputFocus: 'fixedAssetCode',
            isValidate: true,
            fieldInvalidate: '',
            errorMessage: '',
            focusToastWaring: 'cancel',
            DepartmentDescription: ''
        }
    },
    /**
     * @author LB.Thành (04-07-2023)
     * @description Định nghĩa các emit sử dụng trong component
     */
    emits: ['closePopup', 'updateListFixedAsset'],
    /**
     * @author LB.Thành (04-07-2023)
     * @description Định nghĩa các method sử dụng trong component
     */
    methods: {
        /**
         * @author LB.Thành (04-07-2023)
         * @param {*} fixedAsset Tài sản cần thêm
         * @description Thêm tài sản mới
         */
        async createFixedAsset(fixedAsset) {
            try {
                this.setIsLoading(true)
                await FixedAssetAPI.createFixedAsset(fixedAsset)
                setTimeout(() => {
                    this.setIsLoading(false)
                    this.$emit('closePopup')
                    this.$emit('updateListFixedAsset', this.action)
                }, 500)
            } catch (error) {
                console.log(error)
                this.inputFocus = 'fixedAssetCode'
                this.setIsLoading(false)
                this.isShowToastValidateData = true
                this.errorMessage = error.response.data.UserMessage
            }
        },
        /**
         * @author LB.Thành (04-07-2023)
         * @param {*} department phòng ban cần thêm
         * @description Thêm phòng ban mới
         */
         async createDepartment(department) {
            try {
                this.setIsLoading(true)
                await DepartmentAPI.createDepartment(department)
                setTimeout(() => {
                    this.setIsLoading(false)
                    this.$emit('closePopup')
                    this.$emit('updateListFixedAsset', this.action)
                }, 500)
            } catch (error) {
                console.log(error)
                this.setIsLoading(false)
                this.isShowToastValidateData = true
                this.errorMessage = error.response.data.UserMessage
            }
        },
        /**
         * @author LB.Thành (11-07-2023)
         * @param {*} fixedAssetId tài sản cần cập nhật
         * @param {*} fixedAsset tài sản cần cập nhật
         * @description Xử lý logic khi cập nhật tài sản
         */
        async updateFixedAsset(fixedAssetId, fixedAsset) {
            try {
                this.setIsLoading(true)
                await FixedAssetAPI.updateFixedAsset(fixedAssetId, fixedAsset)
                setTimeout(() => {
                    this.setIsLoading(false)
                    this.$emit('closePopup')
                    this.$emit('updateListFixedAsset', this.action)
                }, 500)
            } catch (error) {
                this.setIsLoading(false)
                this.isShowToastValidateData = true
                this.errorMessage = error.response.data.UserMessage
            }
        },
        /**
         * @description Lấy mã code tài sản gợi ý
         * @param
         * @author LB.Thành (11-07-2023)
         */
        async getFixedAssetCode() {
            try {
                this.setIsLoading(true)
                const res = await FixedAssetAPI.getFixedAssetCode()
                setTimeout(() => {
                    this.setIsLoading(false)
                    this.FixedAssetCode = res.data
                }, 500)
            } catch (error) {
                console.log(error)
            }
        },
        /**
         * @description Đóng form
         * @author LB.Thành (11-07-2023)
         */
        closePopup() {
            this.$emit('closePopup')
            this.isShowToastCancel = false
            this.isShowToastCancelEdit = false
        },
        /**
         * @description Set focus cho input
         * @param {*} value tên input cần focus
         * @author LB.Thành (11-07-2023)
         */
        setInputFocus(value) {
            this.inputFocus = value
        },
        /**
         * @description Tăng số lượng tài sản lên 1
         * @author LB.Thành (11-07-2023)
         */
        increaseCount() {
            if (Number(this.Quantity) < 9)
                this.Quantity = '0' + (Number(this.Quantity) + 1).toString()
            else {
                this.Quantity = (Number(this.Quantity) + 1).toString()
            }
        },
        /**
         * @description Giảm số lượng tài sản xuống 1
         * @author LB.Thành (11-07-2023)
         */
        decreaseCount() {
            if (this.Quantity === '01') return
            if (Number(this.Quantity) < 11)
                this.Quantity = '0' + (Number(this.Quantity) - 1).toString()
            else this.Quantity = (Number(this.Quantity) - 1).toString()
        },
        /**
         * @description Kiểm tra dữ liệu form
         * @author LB.Thành (11-07-2023)
         */
        validate() {
            // Validate Dữ liệu
            this.isValidate = true
            let hasMissingFields = false
            let missingFields = ''
            let fieldToFocus = null

            if (this.DepartmentCode === '') {
                hasMissingFields = true
                missingFields += this.labelForm.DepartmentCode 
                if (fieldToFocus === null) {
                    fieldToFocus = 'departmentCode'
                }
            }
            // Kiểm tra các trường khác và thêm vào missingFields khi cần

            if (hasMissingFields) {
                this.isShowToastValidateData = true
                this.messageValidateData = missingFields
                this.isValidate = false

                // Đặt focus vào trường cần focus
                this.inputFocus = fieldToFocus
            }

        },
        /**
         * @description Hiển thị cảnh báo khi người dùng muốn hủy thao tác
         * @author LB.Thành (11-07-2023)
         */
        showToast() {
            if (this.action === 'update' ) {
                this.isShowToastCancelEdit = true
            } else {
                this.isShowToastCancel = true
            }
        },
        /**
         * @description Đóng cảnh báo khi người dùng muốn hủy thao tác và tiếp tục thao tác trên form
         * @author LB.Thành (11-07-2023)
         */
        closeToastValidate() {
            this.isShowToastValidateData = false
            this.isShowToastValidate = false
            this.messageValidate = ''
            this.messageValidateData = ''
            this.errorMessage = ''
        },
        /**
         * @description Submit form
         * @author LB.Thành (11-07-2023)
         */
        submit() {
            this.validate()
            if (this.isValidate) {
                if (!this.isShowToastValidateData && !this.isShowToastValidate) {
                    let newDepartment = {
                        DepartmentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        DepartmentCode: this.DepartmentCode,
                        DepartmentName: this.DepartmentName,
                        DepartmentDescription: this.DepartmentDescription
                    }
                    if (this.action === 'update') {
                        this.updateFixedAsset(this.fixedAsset.FixedAssetId, newFixedAsset)
                    } else {
                        this.createDepartment(newDepartment)
                    }
                }
            }
        },
        /**
         * @description Submit form khi nhấn Enter
         * @param {*} event
         * @author LB.Thành (11-07-2023)
         */
        submitWithEnter(event) {
            if (event.key === 'Enter') {
                this.submit()
            }
        },

    },
    computed: {
        /**
         * @description Lấy danh sách mã phòng ban
         * @author LB.Thành (27-07-2023)
         */
        listDepartmentCode() {
            return this.listDepartment.map((item) => item.DepartmentCode)
        },
        /**
         * @description Lấy danh sách mã loại tài sản
         * @author LB.Thành (27-07-2023)
         */
        listFixedAssetCategoryCode() {
            return this.listFixedAssetCategory.map((item) => item.FixedAssetCategoryCode)
        },
        /**
         * @description Lấy nội dung label trên form nhập liệu
         * @author LB.Thành (27-07-2023)
         */
        labelForm() {
            return this.$_MISAResource.VN.labelForm
        },
        /**
         * @description Lấy nội dung placeholder trên form nhập liệu
         * @author LB.Thành (27-07-2023)
         */
        placeholderForm() {
            return this.$_MISAResource.VN.placeholderForm
        },
        /**
         * @description Lấy nội dung cảnh bảo validate dữ liệu trên form
         * @author LB.Thành (27-07-2023)
         */
        contentValidate() {
            return this.$_MISAResource.VN.validate
        },
        /**
         * @description Kiểm tra xem có phải thao dữ liệu trên form đã được thay đổi hay chưa
         * @author LB.Thành (27-07-2023)
         */
        isUpdate() {
            t = t || this.fixedAsset.DepartmentCode !== this.DepartmentCode.trim()

            if (this.action === 'update') {
                t = t || this.fixedAsset.FixedAssetCode !== this.FixedAssetCode.trim()
                return t
            } else if (this.action === 'replicate') {
                return t
            } else if (this.action === 'create') {
                return true
            }
            return false
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
        }
    },
    /**
     * @description Xử lý khi component được mount vào DOM
     * @author LB.Thành (27-07-2023)
     */
    mounted() {
        this.$refs.fixedAssetCode.focus()
        // Add FixedAsset
        if (this.action === 'create') {
            this.getFixedAssetCode()
        }
        // Update FixedAsset
        else {
            this.DepartmentCode = this.fixedAsset.DepartmentCode
            this.DepartmentName = this.fixedAsset.DepartmentName
            this.DepartmentDescription = this.fixedAsset.DepartmentDescription
        }
    },
    watch: {
        /**
         * @description Xử lý khi thay đổi mã tài sản
         * @param {*} value
         * @author LB.Thành (27-07-2023)
         */
        DepartmentCode(value) {
            this.DepartmentName =
                this.listDepartment.find((item) => item.DepartmentCode === value)?.DepartmentName ||
                ''
            this.DepartmentId = this.listDepartment.find(
                (item) => item.DepartmentCode === value
            )?.DepartmentId
        },

    }
}
</script>
