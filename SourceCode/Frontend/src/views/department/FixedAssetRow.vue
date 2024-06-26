<template>
    <div>
        <section
            class="table__row-dep h-40 grid center-y"
            :class="{ 'row-active': checked }"
            @dblclick="showFormEdit()"
            @click.ctrl="changeChecked(!checked)"
            @contextmenu.stop.prevent="
                (event) => {
                    if (isShowContextMenu) {
                        isShowContextMenu = false
                        return
                    }
                    isShowContextMenu = true
                    contextmenuTop = event.y
                    contextmenuLeft = event.x
                }
            "
            v-click-outside="() => ((isShowContextMenu = false))"
            ref="tableRow"
            tabindex="0"
        >
            <!-- checkbox -->
            <section class="row__checkbox center">
                <m-checkbox :checked="checked" @change="changeChecked" />
            </section>
            <!-- Số thứ tự -->
            <section class="row__stt text-left pl-10">{{ index }}</section>
            <!-- Mã tài sản -->
            <section class="row__code pr-20" :title="fixedAsset.FixedAssetCode">
                {{ fixedAsset.DepartmentCode }}
            </section>
            <!-- Tên tài sản -->
            <section class="row__name pr-20" :title="fixedAsset.FixedAssetName">
                {{ fixedAsset.DepartmentName }}
            </section>
            <section class="row__name pr-20" :title="fixedAsset.FixedAssetName">
                {{ fixedAsset.DepartmentDescription }}
            </section>
            <!-- Chức năng -->
            <section class="row__option center-y">
                <!-- Update -->
                <section
                    class="wrapper-icon"
                    @click=";(isShowForm = true), (action = 'update')"
                    title="Sửa"
                >
                    <section class="icon edit"></section>
                </section>
                <!-- Nhân bản -->
                <section
                    class="wrapper-icon"
                    @click=";(isShowForm = true), (action = 'replicate')"
                    title="Nhân bản"
                >
                    <section class="icon copy"></section>
                </section>
            </section>
        </section>
        <section
            class="context-menu fixed flex-column br-4 row-gap-10"
            v-if="isShowContextMenu"
            v-click-outside="
                () => (isShowContextMenu ? (isShowContextMenu = false) : null)
            "
            :style="{ top: contextmenuTop + 'px', left: contextmenuLeft + 'px' }"
        >
            <section class="context-menu--item" @click=";(isShowForm = true), (action = 'update')">
                Chỉnh sửa
            </section>
            <section class="context-menu--item" @click=";(isShowForm = true), (action = 'replicate')">
                Nhân bản
            </section>
        </section>
    
        <!-- Form cập nhật và nhân bản -->
        <section class="blur" v-if="isShowForm">
            <section class="assets__edit flex-column px-16 br-4 bg-white pt-16">
                <m-Dep
                    :title="action === 'update' ? 'Cập nhật phòng ban' : 'Nhân bản phòng ban'"
                    @closePopup="isShowForm = false"
                    @updateListFixedAsset="$emit('updateListFixedAsset', $event)"
                    :fixedAsset="fixedAsset"
                    :action="action"
                    :listDepartment="listDepartment"
                    :listFixedAssetCategory="listFixedAssetCategory"
                    :contentBtnSubmit="action === 'update' ? 'Lưu' : 'Thêm'"
                />
            </section>
        </section>
    </div>
</template>

<script>
export default {
    name: 'FixedAssetRow',
    /**
     * Author: LB.Thành (11/07/2023)
     * Định nghĩa props cho component
     */
    props: {
        // Dữ liệu tài sản
        fixedAsset: {
            type: Object,
            default: () => ({})
        },
        // Chọn tất cả
        checkAll: {
            type: Boolean,
            default: false
        },
        // Danh sách tài sản được chọn
        listFixedAssetChoose: {
            type: Array,
            default: () => []
        },
        // Số thứ tự của dòng
        index: {
            type: Number,
            default: 0
        },
        // Danh sách phòng ban
        listDepartment: {
            type: Array,
            default: () => []
        },
        // Danh sách loại tài sản
        listFixedAssetCategory: {
            type: Array,
            default: () => []
        }
    },
    /**
     * Author: LB.Thành (11/07/2023)
     * Định nghĩa data cho component
     */
    data() {
        return {
            // Hiển thị form
            isShowForm: false,
            // Chọn checkbox
            checked: false,
            // Hành động
            action: '',
            isShowContextMenu: false,
            contextmenuTop: 0,
            contextmenuLeft: 0
        }
    },
    /**
     * Author: LB.Thành (11/07/2023)
     * Khai báo các emit
     */
    emits: ['changeChecked', 'updateListFixedAsset'],
    methods: {
        /**
         * check Checkbox
         * @param
         * Author: LB.Thành (11/07/2023)
         */
        changeChecked(value) {
            this.checked = value
            this.$emit('changeChecked', this.fixedAsset.FixedAssetId, value)
        },
        /**
         * Format số
         * @param {*} number
         * Author: LB.Thành (11/07/2023)
         */
        formatNumber(number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        },
        showFormEdit(){
            this.isShowForm = true
            this.action = 'update'
            this.$emit('openId', this.fixedAsset.FixedAssetId)
        }
    },
    watch: {
        /**
         * Author: LB.Thành (11/07/2023)
         * Kiểm tra xem tài sản có nằm trong danh sách được chọn hay không
         */
        listFixedAssetChoose() {
            this.checked = this.listFixedAssetChoose.includes(this.fixedAsset.FixedAssetId)
        }
    },
    computed: {
        /**
         * Author: LB.Thành (11/07/2023)
         * Tính giá trị hao mòn lũy kế
         */
        FixedAssetCumulative() {
            // Lấy thời điểm hiện tại
            var currentDate = new Date();
            
            // Chuyển định dạng StartUsingDate từ chuỗi sang đối tượng Date
            var startUsingDate = new Date(this.fixedAsset.StartUsingDate);
            
            // Tính số năm đã trôi qua từ thời điểm StartUsingDate đến thời điểm hiện tại
            var yearsPassed = currentDate.getFullYear() - startUsingDate.getFullYear();
            
            // Tính giá trị khấu hao lũy kế theo công thức
            var cumulativeDepreciation = yearsPassed * (this.fixedAsset.DepreciationRate/100 * this.fixedAsset.Cost);

            return cumulativeDepreciation.toFixed(0);
        },
        /**
         * Author: LB.Thành (11/07/2023)
         * Tính giá trị hao mòn còn lại
         */
        FixedAssetRemaining() {
            return this.fixedAsset.Cost - this.FixedAssetCumulative
        }
    },
    // Khởi tạo
    mounted() {
        // Kiểm tra xem có trong danh sách tài sản được chọn không
        if (this.listFixedAssetChoose.includes(this.fixedAsset.FixedAssetId)) {
            this.checked = true
        }
    }
}
</script>
